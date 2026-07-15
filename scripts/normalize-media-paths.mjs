import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const mediaRoot = path.join(root, "public", "media");

const apply = process.argv.includes("--apply");

/** Legacy / display folder names → canonical collection slug */
const COLLECTION_RENAMES = {
  "Kurta Set": "kurta-sets",
  "kurta set": "kurta-sets",
  Sherwani: "sherwani",
  Suits: "suits",
  "Jawahar Jacket Set": "jawahar-jacket-set",
  "Jawahar Jacket Sets": "jawahar-jacket-set",
  "Jawhar Jacket Set": "jawahar-jacket-set", // common typo
  "Bandhgala & Indo-western": "bandhgala-indo-western",
  "Bandhgala & Indo-Western": "bandhgala-indo-western",
  "Bandghala & Indo-western Set": "bandhgala-indo-western",
  Shirts: "shirts",
};

const WOMENSWEAR_COLLECTION = "womenswear-stock-clearance";

/** Categories where product sets live directly under the category root (no nested collection folder). */
const FLAT_CATEGORIES = new Set(["womenswear"]);

const CANONICAL_MENSWEAR_SLUGS = [...new Set(Object.values(COLLECTION_RENAMES))];

/** Legacy folder names → sequence index before renaming to set-N */
const FOLDER_SORT_INDEX = {
  sherwani: {
    "ivory-threadwork": 1,
    "crimson-embroidered": 2,
    "gold-brocade": 3,
    "pearl-ivory": 4,
    "charcoal-ceremonial": 5,
  },
  suits: {
    "black-1": 1,
    "black-2": 2,
    "black-3": 3,
    "black-4": 4,
    white: 5,
  },
};

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

function slugifyFilename(filename) {
  const ext = path.extname(filename).toLowerCase();
  const base = path.basename(filename, path.extname(filename));

  return `${base
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")}${ext}`;
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function log(message) {
  process.stdout.write(`${message}\n`);
}

/** Resolve the real on-disk directory name in `parentDir` matching `name` case-insensitively. */
function findDirCaseInsensitive(parentDir, name) {
  if (!fs.existsSync(parentDir)) {
    return null;
  }

  const match = fs.readdirSync(parentDir).find((entry) => {
    const fullPath = path.join(parentDir, entry);
    return fs.statSync(fullPath).isDirectory() && entry.toLowerCase() === name.toLowerCase();
  });

  return match ?? null;
}

function movePath(source, target) {
  if (!fs.existsSync(source)) {
    return false;
  }

  if (path.resolve(source) === path.resolve(target)) {
    return false;
  }

  if (fs.existsSync(target)) {
    // Case-insensitive FS: source and target may be the same directory
    try {
      if (fs.statSync(source).ino === fs.statSync(target).ino) {
        return false;
      }
    } catch {
      // fall through
    }

    log(`SKIP target exists: ${path.relative(mediaRoot, target)}`);
    return false;
  }

  log(`${apply ? "MOVE" : "DRY-RUN"} ${path.relative(mediaRoot, source)} → ${path.relative(mediaRoot, target)}`);
  if (apply) {
    ensureDir(path.dirname(target));
    fs.renameSync(source, target);
  }

  return true;
}

function folderSortIndex(collectionSlug, folderSlug) {
  const setMatch = folderSlug.match(/^set-(\d+)$/);
  if (setMatch) {
    return Number(setMatch[1]);
  }

  const bareNumber = folderSlug.match(/^(\d+)$/);
  if (bareNumber) {
    return Number(bareNumber[1]);
  }

  const known = FOLDER_SORT_INDEX[collectionSlug]?.[folderSlug];
  if (known != null) {
    return known;
  }

  const womenswearMatch = folderSlug.match(/^womenswear-(\d+)$/);
  if (womenswearMatch) {
    return Number(womenswearMatch[1]);
  }

  const trailingMatch = folderSlug.match(/-(\d+)$/);
  if (trailingMatch) {
    return Number(trailingMatch[1]);
  }

  return Number.MAX_SAFE_INTEGER;
}

function renameProductFoldersToGenericSets(collectionDir, collectionSlug) {
  if (!fs.existsSync(collectionDir)) {
    return;
  }

  const productDirs = fs
    .readdirSync(collectionDir)
    .filter((entry) => fs.statSync(path.join(collectionDir, entry)).isDirectory())
    .sort((a, b) => folderSortIndex(collectionSlug, a) - folderSortIndex(collectionSlug, b) || a.localeCompare(b));

  const alreadyCanonical = productDirs.every((folderSlug, index) => folderSlug === `set-${index + 1}`);
  if (alreadyCanonical) {
    return;
  }

  const tempMoves = productDirs.map((folderSlug, index) => ({
    from: path.join(collectionDir, folderSlug),
    temp: path.join(collectionDir, `__set_tmp_${index}`),
    final: path.join(collectionDir, `set-${index + 1}`),
    folderSlug,
  }));

  for (const move of tempMoves) {
    if (move.folderSlug === path.basename(move.final)) {
      continue;
    }

    log(
      `${apply ? "MOVE" : "DRY-RUN"} ${path.relative(mediaRoot, move.from)} → ${path.relative(mediaRoot, move.temp)}`,
    );
    if (apply) {
      fs.renameSync(move.from, move.temp);
    }
  }

  for (const move of tempMoves) {
    if (move.folderSlug === path.basename(move.final)) {
      continue;
    }

    const source = apply && fs.existsSync(move.temp) ? move.temp : move.from;
    // In dry-run, temp folders were not created — show intended final rename
    if (!apply) {
      log(`DRY-RUN ${path.relative(mediaRoot, move.from)} → ${path.relative(mediaRoot, move.final)}`);
      continue;
    }

    movePath(source, move.final);
  }
}

function normalizeFilenamesInDir(dir) {
  if (!fs.existsSync(dir)) {
    return;
  }

  for (const entry of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, entry);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      normalizeFilenamesInDir(fullPath);
      continue;
    }

    const nextName = slugifyFilename(entry);
    if (nextName === entry) {
      continue;
    }

    movePath(fullPath, path.join(dir, nextName));
  }
}

function renameCollectionFolders(categoryDir) {
  if (!fs.existsSync(categoryDir)) {
    return;
  }

  // Build lookup from lowercase legacy name → slug
  const renameByLower = new Map(
    Object.entries(COLLECTION_RENAMES).map(([oldName, slug]) => [oldName.toLowerCase(), slug]),
  );

  for (const entry of fs.readdirSync(categoryDir)) {
    const fullPath = path.join(categoryDir, entry);
    if (!fs.statSync(fullPath).isDirectory()) {
      continue;
    }

    const slug = renameByLower.get(entry.toLowerCase());
    if (!slug) {
      continue;
    }

    // Already using the canonical folder name
    if (entry === slug) {
      continue;
    }

    const target = path.join(categoryDir, slug);

    // Case-only rename (e.g. Sherwani → sherwani on case-insensitive volumes)
    if (entry.toLowerCase() === slug.toLowerCase()) {
      const temp = path.join(categoryDir, `_${slug}_tmp`);
      log(
        `${apply ? "MOVE" : "DRY-RUN"} ${path.relative(mediaRoot, fullPath)} → ${path.relative(mediaRoot, temp)} → ${path.relative(mediaRoot, target)}`,
      );
      if (apply) {
        fs.renameSync(fullPath, temp);
        fs.renameSync(temp, target);
      }
      continue;
    }

    if (findDirCaseInsensitive(categoryDir, slug) && findDirCaseInsensitive(categoryDir, slug) !== entry) {
      log(`SKIP conflict: ${entry} → ${slug} (target already exists)`);
      continue;
    }

    movePath(fullPath, target);
  }
}

function collectionDirFor(category, collectionSlug) {
  return FLAT_CATEGORIES.has(category)
    ? path.join(mediaRoot, category)
    : path.join(mediaRoot, category, collectionSlug);
}

function renameProductFolders(category, collectionSlug) {
  renameProductFoldersToGenericSets(collectionDirFor(category, collectionSlug), collectionSlug);
}

function distributeLooseFiles(category, collectionSlug) {
  const collectionDir = collectionDirFor(category, collectionSlug);

  if (!fs.existsSync(collectionDir)) {
    return;
  }

  const looseFiles = fs
    .readdirSync(collectionDir)
    .filter((entry) => {
      const fullPath = path.join(collectionDir, entry);
      return fs.statSync(fullPath).isFile() && IMAGE_EXTENSIONS.has(path.extname(entry).toLowerCase());
    })
    .sort((a, b) => a.localeCompare(b));

  if (looseFiles.length === 0) {
    return;
  }

  const productDirs = fs
    .readdirSync(collectionDir)
    .filter((entry) => fs.statSync(path.join(collectionDir, entry)).isDirectory())
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  let index = 0;

  for (const file of looseFiles) {
    let targetDir = productDirs[index];

    if (!targetDir) {
      const fallbackName = `set-${productDirs.length + 1}`;
      targetDir = fallbackName;
      const createdDir = path.join(collectionDir, targetDir);
      log(`${apply ? "MKDIR" : "DRY-RUN MKDIR"} ${path.relative(mediaRoot, createdDir)}`);
      if (apply) {
        ensureDir(createdDir);
      }
      productDirs.push(targetDir);
    }

    movePath(path.join(collectionDir, file), path.join(collectionDir, targetDir, slugifyFilename(file)));

    const dirFiles = fs.existsSync(path.join(collectionDir, targetDir))
      ? fs
          .readdirSync(path.join(collectionDir, targetDir))
          .filter((entry) => IMAGE_EXTENSIONS.has(path.extname(entry).toLowerCase())).length
      : 0;

    if (dirFiles >= 2 || collectionSlug === WOMENSWEAR_COLLECTION || FLAT_CATEGORIES.has(category)) {
      index += 1;
    }
  }
}

function flattenWomenswear() {
  const categoryDir = path.join(mediaRoot, "womenswear");
  const nestedDir = path.join(categoryDir, WOMENSWEAR_COLLECTION);

  if (!fs.existsSync(categoryDir) || !fs.existsSync(nestedDir)) {
    return;
  }

  for (const entry of fs.readdirSync(nestedDir)) {
    movePath(path.join(nestedDir, entry), path.join(categoryDir, entry));
  }

  if (apply && fs.existsSync(nestedDir) && fs.readdirSync(nestedDir).length === 0) {
    log(`RMDIR ${path.relative(mediaRoot, nestedDir)}`);
    fs.rmdirSync(nestedDir);
  }
}

function warnUnknownMenswearFolders(menswearDir) {
  if (!fs.existsSync(menswearDir)) {
    return;
  }

  const known = new Set(CANONICAL_MENSWEAR_SLUGS.map((slug) => slug.toLowerCase()));
  for (const entry of Object.keys(COLLECTION_RENAMES)) {
    known.add(entry.toLowerCase());
  }

  for (const entry of fs.readdirSync(menswearDir)) {
    const fullPath = path.join(menswearDir, entry);
    if (!fs.statSync(fullPath).isDirectory()) {
      continue;
    }

    if (!known.has(entry.toLowerCase())) {
      log(`WARN unknown menswear folder (not renamed): ${entry}`);
    }
  }
}

function removeEmptyDirs(dir) {
  if (!fs.existsSync(dir)) {
    return;
  }

  for (const entry of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, entry);
    if (fs.statSync(fullPath).isDirectory()) {
      removeEmptyDirs(fullPath);
    }
  }

  if (dir === mediaRoot) {
    return;
  }

  if (fs.readdirSync(dir).length === 0) {
    log(`${apply ? "RMDIR" : "DRY-RUN RMDIR"} ${path.relative(mediaRoot, dir)}`);
    if (apply) {
      fs.rmdirSync(dir);
    }
  }
}

function normalizeMediaPaths() {
  const menswearDir = path.join(mediaRoot, "menswear");

  renameCollectionFolders(menswearDir);
  flattenWomenswear();
  warnUnknownMenswearFolders(menswearDir);

  for (const collectionSlug of CANONICAL_MENSWEAR_SLUGS) {
    const collectionDir = path.join(mediaRoot, "menswear", collectionSlug);
    if (!fs.existsSync(collectionDir) && !findDirCaseInsensitive(menswearDir, collectionSlug)) {
      continue;
    }

    renameProductFolders("menswear", collectionSlug);
    distributeLooseFiles("menswear", collectionSlug);
    normalizeFilenamesInDir(path.join(mediaRoot, "menswear", collectionSlug));
    renameProductFolders("menswear", collectionSlug);
  }

  renameProductFolders("womenswear", WOMENSWEAR_COLLECTION);
  distributeLooseFiles("womenswear", WOMENSWEAR_COLLECTION);
  normalizeFilenamesInDir(path.join(mediaRoot, "womenswear"));
  renameProductFolders("womenswear", WOMENSWEAR_COLLECTION);

  if (apply) {
    removeEmptyDirs(mediaRoot);
  }

  log(apply ? "Media path normalization complete." : "Dry run complete. Re-run with --apply to execute.");
}

normalizeMediaPaths();
