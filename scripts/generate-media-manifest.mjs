import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const mediaRoot = path.join(root, "public", "media");
const manifestOutputPath = path.join(root, "generated", "media-manifest.ts");
const catalogOutputPath = path.join(root, "generated", "product-catalog.generated.ts");
const overlayPath = path.join(root, "data", "product-catalog.overlay.json");

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
const CATEGORIES = ["menswear", "womenswear"];

const COLLECTION_SKU_ABBREV = {
  sherwani: "SH",
  "kurta-sets": "KS",
  suits: "SU",
  "jawahar-jacket-set": "JJ",
  "bandhgala-indo-western": "BI",
  shirts: "ST",
  "womenswear-stock-clearance": "WC",
};

/** Display title prefix per collection — products become "{label} 1", "{label} 2", … */
const COLLECTION_SET_LABELS = {
  sherwani: "Sherwani Set",
  "kurta-sets": "Kurta Set",
  suits: "Suit Set",
  "jawahar-jacket-set": "Jawahar Jacket Set",
  "bandhgala-indo-western": "Bandhgala Set",
  shirts: "Shirt Set",
  "womenswear-stock-clearance": "Womens Wear Set",
};

/** URL slug prefix per collection — products become "{prefix}-set-1", "{prefix}-set-2", … */
const COLLECTION_SET_SLUG_PREFIX = {
  sherwani: "sherwani",
  "kurta-sets": "kurta",
  suits: "suit",
  "jawahar-jacket-set": "jawahar",
  "bandhgala-indo-western": "bandhgala",
  shirts: "shirt",
  "womenswear-stock-clearance": "womenswear",
};

/** Legacy on-disk folder names → canonical collection slugs used in constants/collections.ts */
const COLLECTION_SLUG_ALIASES = {
  "Kurta Set": "kurta-sets",
  Sherwani: "sherwani",
  Suits: "suits",
  "Jawahar Jacket Set": "jawahar-jacket-set",
  "Jawahar Jacket Sets": "jawahar-jacket-set",
  "Bandhgala & Indo-western": "bandhgala-indo-western",
  Shirts: "shirts",
};

const CANONICAL_COLLECTION_SLUGS = new Set(Object.keys(COLLECTION_SKU_ABBREV));

function resolveCollectionSlug(folderName) {
  return COLLECTION_SLUG_ALIASES[folderName] ?? folderName;
}

function isCanonicalCollectionSlug(slug) {
  return CANONICAL_COLLECTION_SLUGS.has(slug);
}

function isImageFile(name) {
  return IMAGE_EXTENSIONS.has(path.extname(name).toLowerCase());
}

function collectImagesInDir(dir, urlPrefix) {
  const files = [];

  for (const entry of fs.readdirSync(dir).sort()) {
    const fullPath = path.join(dir, entry);
    const stat = fs.statSync(fullPath);

    if (stat.isFile() && isImageFile(entry)) {
      files.push(`${urlPrefix}/${entry}`);
    } else if (stat.isDirectory()) {
      files.push(...collectImagesInDir(fullPath, `${urlPrefix}/${entry}`));
    }
  }

  return files.sort((a, b) => a.localeCompare(b));
}

function collectImagesInFolderOnly(dir, urlPrefix) {
  const files = [];

  for (const entry of fs.readdirSync(dir).sort()) {
    const fullPath = path.join(dir, entry);
    const stat = fs.statSync(fullPath);

    if (stat.isFile() && isImageFile(entry)) {
      files.push(`${urlPrefix}/${entry}`);
    }
  }

  return files.sort((a, b) => a.localeCompare(b));
}

function extractSetNumber(folderSlug) {
  const setMatch = folderSlug.match(/^set-(\d+)$/);
  if (setMatch) {
    return Number(setMatch[1]);
  }

  const trailingMatch = folderSlug.match(/-(\d+)$/);
  if (trailingMatch) {
    return Number(trailingMatch[1]);
  }

  return null;
}

function defaultProductTitle(collectionSlug, setNumber) {
  const label = COLLECTION_SET_LABELS[collectionSlug] ?? "Set";
  return `${label} ${setNumber}`;
}

function defaultProductSlug(collectionSlug, setNumber) {
  const prefix = COLLECTION_SET_SLUG_PREFIX[collectionSlug] ?? collectionSlug;
  return `${prefix}-set-${setNumber}`;
}

function sortProductFolders(folderSlugs) {
  return [...folderSlugs].sort((a, b) => {
    const aNum = extractSetNumber(a) ?? Number.MAX_SAFE_INTEGER;
    const bNum = extractSetNumber(b) ?? Number.MAX_SAFE_INTEGER;

    return aNum - bNum || a.localeCompare(b, undefined, { numeric: true });
  });
}

function loadOverlay() {
  if (!fs.existsSync(overlayPath)) {
    return {};
  }

  return JSON.parse(fs.readFileSync(overlayPath, "utf8"));
}

function collectManifestAndCatalog() {
  /** @type {Record<string, string[]>} */
  const manifest = {};
  /** @type {Array<Record<string, unknown>>} */
  const catalog = [];
  const overlay = loadOverlay();
  /** @type {Record<string, number>} */
  const skuCounters = {};
  /** @type {Set<string>} */
  const seenCanonicalSlugs = new Set();

  for (const category of CATEGORIES) {
    const categoryDir = path.join(mediaRoot, category);

    if (!fs.existsSync(categoryDir)) {
      continue;
    }

    for (const folderName of fs.readdirSync(categoryDir).sort()) {
      const collectionDir = path.join(categoryDir, folderName);

      if (!fs.statSync(collectionDir).isDirectory()) {
        continue;
      }

      const collectionSlug = resolveCollectionSlug(folderName);

      if (!isCanonicalCollectionSlug(collectionSlug)) {
        continue;
      }

      const slugKey = `${category}/${collectionSlug}`;
      if (seenCanonicalSlugs.has(slugKey)) {
        continue;
      }
      seenCanonicalSlugs.add(slugKey);

      const collectionPrefix = `/media/${category}/${folderName}`;
      const files = collectImagesInDir(collectionDir, collectionPrefix);

      if (files.length > 0) {
        manifest[collectionSlug] = [...(manifest[collectionSlug] ?? []), ...files].sort((a, b) => a.localeCompare(b));
      }

      let folderOrder = 0;

      const productFolders = sortProductFolders(
        fs.readdirSync(collectionDir).filter((entry) => fs.statSync(path.join(collectionDir, entry)).isDirectory()),
      );

      for (const folderSlug of productFolders) {
        const folderDir = path.join(collectionDir, folderSlug);

        const folderPrefix = `${collectionPrefix}/${folderSlug}`;
        const imagePaths = collectImagesInFolderOnly(folderDir, folderPrefix);

        if (imagePaths.length === 0) {
          continue;
        }

        folderOrder += 1;
        const setNumber = extractSetNumber(folderSlug) ?? folderOrder;
        const key = `${category}/${collectionSlug}/${folderSlug}`;
        const overlayEntry = overlay[key] ?? {};
        const abbrev = COLLECTION_SKU_ABBREV[collectionSlug] ?? collectionSlug.slice(0, 2).toUpperCase();
        skuCounters[collectionSlug] = (skuCounters[collectionSlug] ?? 0) + 1;
        const autoSku = `SM-${abbrev}-${String(skuCounters[collectionSlug]).padStart(3, "0")}`;

        catalog.push({
          key,
          category,
          collectionSlug,
          folderSlug,
          slug: overlayEntry.slug ?? defaultProductSlug(collectionSlug, setNumber),
          sku: overlayEntry.sku ?? autoSku,
          title: overlayEntry.title ?? defaultProductTitle(collectionSlug, setNumber),
          description: overlayEntry.description,
          featured: overlayEntry.featured ?? false,
          order: overlayEntry.order ?? setNumber,
          imagePaths,
          primaryImagePath: imagePaths[0],
        });
      }
    }
  }

  return { manifest, catalog };
}

function formatManifest(manifest) {
  const entries = Object.entries(manifest)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([slug, files]) => {
      const fileLines = files.map((file) => `    "${file}"`).join(",\n");
      return `  "${slug}": [\n${fileLines}\n  ]`;
    })
    .join(",\n");

  return `// Auto-generated by scripts/generate-media-manifest.mjs — do not edit manually.
// Re-run: npm run generate:media-manifest

export const MEDIA_MANIFEST = {
${entries}
} as const;

export type MediaManifestSlug = keyof typeof MEDIA_MANIFEST;
`;
}

function formatCatalog(catalog) {
  const lines = catalog.map((product) => {
    const imagePaths = product.imagePaths.map((p) => `      "${p}"`).join(",\n");
    const description = product.description ? `\n    description: ${JSON.stringify(product.description)},` : "";
    const featuredLine = `\n    featured: ${product.featured ? "true" : "false"},`;

    return `  {
    key: ${JSON.stringify(product.key)},
    category: ${JSON.stringify(product.category)},
    collectionSlug: ${JSON.stringify(product.collectionSlug)},
    folderSlug: ${JSON.stringify(product.folderSlug)},
    slug: ${JSON.stringify(product.slug)},
    sku: ${JSON.stringify(product.sku)},
    title: ${JSON.stringify(product.title)},${description}${featuredLine}
    order: ${product.order},
    imagePaths: [
${imagePaths}
    ],
    primaryImagePath: ${JSON.stringify(product.primaryImagePath)},
  }`;
  });

  return `// Auto-generated by scripts/generate-media-manifest.mjs — do not edit manually.
// Re-run: npm run generate:media

import type { GeneratedProductDef } from "@/lib/catalog";

export const GENERATED_PRODUCT_DEFS = [
${lines.join(",\n")}
] satisfies GeneratedProductDef[];
`;
}

const { manifest, catalog } = collectManifestAndCatalog();
fs.writeFileSync(manifestOutputPath, formatManifest(manifest), "utf8");
fs.writeFileSync(catalogOutputPath, formatCatalog(catalog), "utf8");
process.stdout.write(
  `Wrote ${path.relative(root, manifestOutputPath)} (${Object.keys(manifest).length} collections)\n`,
);
process.stdout.write(`Wrote ${path.relative(root, catalogOutputPath)} (${catalog.length} products)\n`);
