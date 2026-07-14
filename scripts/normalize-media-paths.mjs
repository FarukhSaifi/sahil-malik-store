import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const mediaRoot = path.join(root, "public", "media");

const apply = process.argv.includes("--apply");

const COLLECTION_RENAMES = {
  "Kurta Set": "kurta-sets",
  Sherwani: "sherwani",
  Suits: "suits",
  "Jawahar Jacket Set": "jawahar-jacket-set",
  "Jawahar Jacket Sets": "jawahar-jacket-set",
  "Bandhgala & Indo-western": "bandhgala-indo-western",
  Shirts: "shirts",
};

const WOMENSWEAR_COLLECTION = "womenswear-stock-clearance";

/** Categories where product sets live directly under the category root (no nested collection folder). */
const FLAT_CATEGORIES = new Set(["womenswear"]);

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

function movePath(source, target) {
  if (!fs.existsSync(source)) {
    return false;
  }

  if (fs.existsSync(target)) {
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

function log(message) {
  process.stdout.write(`${message}\n`);
}

function folderSortIndex(collectionSlug, folderSlug) {
  const setMatch = folderSlug.match(/^set-(\d+)$/);
  if (setMatch) {
    return Number(setMatch[1]);
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
    .sort((a, b) => folderSortIndex(collectionSlug, a) - folderSortIndex(collectionSlug, b));

  const tempMoves = productDirs.map((folderSlug, index) => ({
    from: path.join(collectionDir, folderSlug),
    temp: path.join(collectionDir, `__set_tmp_${index}`),
    final: path.join(collectionDir, `set-${index + 1}`),
    folderSlug,
  }));

  for (const move of tempMoves) {
    const targetName = path.basename(move.final);
    if (move.folderSlug === targetName) {
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
    const targetName = path.basename(move.final);
    if (move.folderSlug === targetName) {
      continue;
    }

    const source = fs.existsSync(move.temp) ? move.temp : move.from;
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

    const target = path.join(dir, nextName);
    movePath(fullPath, target);
  }
}

function renameCollectionFolders(categoryDir) {
  if (!fs.existsSync(categoryDir)) {
    return;
  }

  for (const [oldName, newSlug] of Object.entries(COLLECTION_RENAMES)) {
    const source = path.join(categoryDir, oldName);
    const target = path.join(categoryDir, newSlug);

    if (!fs.existsSync(source)) {
      continue;
    }

    if (source === target || oldName.toLowerCase() === newSlug.toLowerCase()) {
      const temp = path.join(categoryDir, `_${newSlug}_tmp`);
      log(
        `${apply ? "MOVE" : "DRY-RUN"} ${path.relative(mediaRoot, source)} → ${path.relative(mediaRoot, temp)} → ${path.relative(mediaRoot, target)}`,
      );
      if (apply) {
        fs.renameSync(source, temp);
        fs.renameSync(temp, target);
      }
      continue;
    }

    movePath(source, target);
  }
}

function renameProductFolders(category, collectionSlug) {
  const collectionDir = FLAT_CATEGORIES.has(category)
    ? path.join(mediaRoot, category)
    : path.join(mediaRoot, category, collectionSlug);

  renameProductFoldersToGenericSets(collectionDir, collectionSlug);
}

function distributeLooseFiles(category, collectionSlug) {
  const collectionDir = FLAT_CATEGORIES.has(category)
    ? path.join(mediaRoot, category)
    : path.join(mediaRoot, category, collectionSlug);

  if (!fs.existsSync(collectionDir)) {
    return;
  }

  const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
  const looseFiles = fs
    .readdirSync(collectionDir)
    .filter((entry) => {
      const fullPath = path.join(collectionDir, entry);
      return fs.statSync(fullPath).isFile() && imageExtensions.has(path.extname(entry).toLowerCase());
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

    const source = path.join(collectionDir, file);
    const target = path.join(collectionDir, targetDir, slugifyFilename(file));
    movePath(source, target);

    const dirFiles = fs.existsSync(path.join(collectionDir, targetDir))
      ? fs
          .readdirSync(path.join(collectionDir, targetDir))
          .filter((entry) => imageExtensions.has(path.extname(entry).toLowerCase())).length
      : 0;

    if (dirFiles >= 2 || collectionSlug === WOMENSWEAR_COLLECTION) {
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

  const entries = fs.readdirSync(nestedDir);

  for (const entry of entries) {
    movePath(path.join(nestedDir, entry), path.join(categoryDir, entry));
  }

  if (apply && fs.existsSync(nestedDir) && fs.readdirSync(nestedDir).length === 0) {
    log(`RMDIR ${path.relative(mediaRoot, nestedDir)}`);
    fs.rmdirSync(nestedDir);
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

  const hasEntries = fs.readdirSync(dir).length > 0;
  if (!hasEntries) {
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

  for (const collectionSlug of Object.values(COLLECTION_RENAMES)) {
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
