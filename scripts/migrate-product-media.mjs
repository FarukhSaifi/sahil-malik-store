import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const mediaRoot = path.join(root, "public", "media");
const csvPath = path.join(__dirname, "product-media-map.csv");
const logPath = path.join(__dirname, "migrate-product-media.log");

const apply = process.argv.includes("--apply");

function parseCsv(content) {
  const lines = content.trim().split("\n");
  const headers = lines[0].split(",").map((h) => h.trim());
  const rows = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const values = line.split(",").map((v) => v.trim());
    const row = Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""]));
    rows.push(row);
  }

  return rows;
}

function targetFilename(row) {
  const ext = path.extname(row.old_filename).toLowerCase();

  if (row.sku && row.product_slug) {
    const sku = row.sku.toLowerCase();
    return `${sku}-${row.product_slug}${ext}`;
  }

  const base = path.basename(row.old_filename, ext);
  return `lookbook-${base}${ext}`;
}

function targetRelativePath(row) {
  const filename = targetFilename(row);
  return path.join(row.category, row.collection, row.sub_category, filename);
}

function logLine(message) {
  const timestamp = new Date().toISOString();
  const line = `[${timestamp}] ${message}\n`;
  fs.appendFileSync(logPath, line, "utf8");
  process.stdout.write(`${message}\n`);
}

function migrate() {
  if (!fs.existsSync(csvPath)) {
    process.stderr.write(`CSV not found: ${csvPath}\n`);
    process.exit(1);
  }

  if (apply) {
    fs.writeFileSync(logPath, "", "utf8");
  }

  const rows = parseCsv(fs.readFileSync(csvPath, "utf8"));
  let moved = 0;
  let skipped = 0;
  let errors = 0;

  for (const row of rows) {
    const sourcePath = path.join(mediaRoot, row.category, row.collection, row.old_filename);
    const targetRel = targetRelativePath(row);
    const targetPath = path.join(mediaRoot, targetRel);

    if (!fs.existsSync(sourcePath)) {
      const nestedCandidate = path.join(mediaRoot, row.category, row.collection, row.sub_category, row.old_filename);

      if (fs.existsSync(nestedCandidate)) {
        logLine(`SKIP already migrated: ${targetRel}`);
        skipped++;
        continue;
      }

      logLine(`ERROR source not found: ${sourcePath}`);
      errors++;
      continue;
    }

    if (fs.existsSync(targetPath)) {
      logLine(`SKIP target exists: ${targetRel}`);
      skipped++;
      continue;
    }

    logLine(`${apply ? "MOVE" : "DRY-RUN"} ${row.old_filename} → ${targetRel.replaceAll(path.sep, "/")}`);

    if (apply) {
      fs.mkdirSync(path.dirname(targetPath), { recursive: true });
      fs.renameSync(sourcePath, targetPath);
      moved++;
    }
  }

  const summary = apply
    ? `Done. Moved: ${moved}, skipped: ${skipped}, errors: ${errors}`
    : `Dry run complete. ${rows.length} rows (${errors} errors). Re-run with --apply to execute.`;

  logLine(summary);

  if (errors > 0) {
    process.exit(1);
  }
}

migrate();
