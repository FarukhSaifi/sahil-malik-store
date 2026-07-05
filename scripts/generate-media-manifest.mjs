import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const mediaRoot = path.join(root, "public", "media");
const manifestOutputPath = path.join(root, "constants", "media-manifest.ts");
const catalogOutputPath = path.join(root, "constants", "product-catalog.generated.ts");
const overlayPath = path.join(root, "constants", "product-catalog.overlay.json");

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

function isLookbookOnlyFolder(imagePaths) {
  if (imagePaths.length === 0) {
    return true;
  }

  return imagePaths.every((imagePath) => {
    const filename = path.basename(imagePath).toLowerCase();
    return filename.startsWith("lookbook-");
  });
}

function titleizeFolder(slug) {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
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

  for (const category of CATEGORIES) {
    const categoryDir = path.join(mediaRoot, category);

    if (!fs.existsSync(categoryDir)) {
      continue;
    }

    for (const collectionSlug of fs.readdirSync(categoryDir).sort()) {
      const collectionDir = path.join(categoryDir, collectionSlug);

      if (!fs.statSync(collectionDir).isDirectory()) {
        continue;
      }

      const collectionPrefix = `/media/${category}/${collectionSlug}`;
      const files = collectImagesInDir(collectionDir, collectionPrefix);

      if (files.length > 0) {
        manifest[collectionSlug] = files;
      }

      let folderOrder = 0;

      for (const folderSlug of fs.readdirSync(collectionDir).sort()) {
        const folderDir = path.join(collectionDir, folderSlug);

        if (!fs.statSync(folderDir).isDirectory()) {
          continue;
        }

        const folderPrefix = `${collectionPrefix}/${folderSlug}`;
        const imagePaths = collectImagesInFolderOnly(folderDir, folderPrefix);

        if (imagePaths.length === 0 || isLookbookOnlyFolder(imagePaths)) {
          continue;
        }

        folderOrder += 1;
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
          slug: overlayEntry.slug ?? folderSlug,
          sku: overlayEntry.sku ?? autoSku,
          title: overlayEntry.title ?? titleizeFolder(folderSlug),
          description: overlayEntry.description,
          featured: overlayEntry.featured ?? false,
          order: overlayEntry.order ?? folderOrder,
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

import type { GeneratedProductDef } from "@/constants/product-catalog";

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
