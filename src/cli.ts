#!/usr/bin/env node
import { cp, mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import YAML from "yaml";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import type { Purchase } from "./domain.js";

const root = process.cwd();

function slugify(input: string): string {
  return input
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function compactSlug(input: string): string {
  const slug = slugify(input);
  return slug.slice(0, 48).replace(/-+$/g, "") || "intake";
}

function isUrl(input: string): boolean {
  try {
    const url = new URL(input);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

async function createPurchase(title: string) {
  const id = slugify(title);
  if (!id) throw new Error("Could not derive a purchase id from title.");

  const target = path.join(root, "purchases", "active", id);
  await mkdir(target, { recursive: false });

  const today = new Date().toISOString().slice(0, 10);
  const raw = await readFile(path.join(root, "templates", "purchase.yaml"), "utf8");
  const purchase = YAML.parse(raw) as Purchase;
  purchase.id = id;
  purchase.title = title;
  purchase.created_at = today;
  purchase.updated_at = today;

  await writeFile(path.join(target, "purchase.yaml"), YAML.stringify(purchase));
  await cp(path.join(root, "templates", "research.md"), path.join(target, "research.md"));
  await cp(path.join(root, "templates", "decision.md"), path.join(target, "decision.md"));

  console.log(`Created purchases/active/${id}`);
}

async function createIntake(input: string) {
  if (!input) throw new Error('Usage: yarn shop intake "<url or description>"');

  const now = new Date();
  const timestamp = now.toISOString().replace(/[:.]/g, "-");
  const kind = isUrl(input) ? "url" : "description";
  const slugSource = kind === "url" ? new URL(input).hostname : input;
  const filename = `${timestamp}-${compactSlug(slugSource)}.yaml`;
  const targetDir = path.join(root, "inbox");
  await mkdir(targetDir, { recursive: true });

  const intake = {
    schema_version: 1,
    kind,
    input,
    created_at: now.toISOString(),
    status: "pending",
  };

  await writeFile(path.join(targetDir, filename), YAML.stringify(intake));
  console.log(`Captured inbox/${filename}`);
}

async function loadPurchase(file: string): Promise<Purchase> {
  return YAML.parse(await readFile(file, "utf8")) as Purchase;
}

async function validate() {
  const schema = JSON.parse(
    await readFile(path.join(root, "schemas", "purchase.schema.json"), "utf8"),
  );
  const ajv = new Ajv({ allErrors: true });
  addFormats(ajv);
  const validatePurchase = ajv.compile(schema);

  const base = path.join(root, "purchases", "active");
  await mkdir(base, { recursive: true });
  const entries = await readdir(base, { withFileTypes: true });

  let failed = false;
  for (const entry of entries.filter((item) => item.isDirectory())) {
    const file = path.join(base, entry.name, "purchase.yaml");
    const purchase = await loadPurchase(file);
    if (!validatePurchase(purchase)) {
      failed = true;
      console.error(`Invalid: ${entry.name}`);
      console.error(validatePurchase.errors);
    }
  }

  if (failed) process.exitCode = 1;
  else console.log("All active purchases are valid.");
}

async function status() {
  const base = path.join(root, "purchases", "active");
  await mkdir(base, { recursive: true });
  const entries = await readdir(base, { withFileTypes: true });
  const purchases = await Promise.all(
    entries
      .filter((item) => item.isDirectory())
      .map((entry) => loadPurchase(path.join(base, entry.name, "purchase.yaml"))),
  );

  if (purchases.length === 0) {
    console.log("No active purchases.");
    return;
  }

  for (const purchase of purchases.sort((a, b) => a.title.localeCompare(b.title))) {
    const rec = purchase.current_recommendation;
    const budget = purchase.constraints.budget.max
      ? ` · budget ≤ ${purchase.constraints.budget.max} ${purchase.currency}`
      : "";
    console.log(`${purchase.title} [${purchase.status}]${budget}`);
    if (rec.rationale) console.log(`  ${rec.action}: ${rec.rationale}`);
  }
}

async function main() {
  const [command, ...args] = process.argv.slice(2);

  if (command === "new") {
    const title = args.join(" ").trim();
    if (!title) throw new Error("Usage: yarn shop new <title>");
    await createPurchase(title);
    return;
  }

  if (command === "intake") {
    await createIntake(args.join(" ").trim());
    return;
  }

  if (command === "validate") {
    await validate();
    return;
  }

  if (command === "status") {
    await status();
    return;
  }

  console.log("Usage:");
  console.log('  yarn shop intake "<url or description>"');
  console.log("  yarn shop new <title>");
  console.log("  yarn shop validate");
  console.log("  yarn shop status");
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
