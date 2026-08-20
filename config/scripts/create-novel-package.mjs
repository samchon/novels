#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HELP = `Create an evidence-compiled novel package.

Usage:
  pnpm create:novel <slug>

Options:
  --dry-run   Validate and print the files without writing
  -h, --help  Show this help

Example:
  pnpm create:novel winter-orbit
`;

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = path.resolve(scriptDirectory, "../..");
const packagesRoot = path.resolve(workspaceRoot, "packages");
const templateRoot = path.resolve(scriptDirectory, "../template");

function fail(message) {
  throw new Error(message);
}

function parseArguments(args) {
  if (args.includes("--help") || args.includes("-h"))
    return { help: true };

  const result = {
    dryRun: false,
    help: false,
    slug: undefined,
  };

  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index];
    if (argument === "--dry-run") {
      if (result.dryRun) fail("--dry-run was provided more than once.");
      result.dryRun = true;
    } else if (argument.startsWith("-")) {
      fail(`Unknown option: ${argument}`);
    } else if (result.slug === undefined) {
      result.slug = argument;
    } else {
      fail(`Unexpected positional argument: ${argument}`);
    }
  }

  return result;
}

function assertInside(parent, target, label) {
  const relative = path.relative(parent, target);
  if (
    relative === "" ||
    relative === ".." ||
    relative.startsWith(`..${path.sep}`) ||
    path.isAbsolute(relative)
  )
    fail(`${label} resolves outside ${parent}.`);
}

function packageNamesInWorkspace() {
  if (!fs.existsSync(packagesRoot)) return [];
  return fs
    .readdirSync(packagesRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(packagesRoot, entry.name, "package.json"))
    .filter((manifest) => fs.existsSync(manifest))
    .map((manifest) => JSON.parse(fs.readFileSync(manifest, "utf8")).name)
    .filter((name) => typeof name === "string");
}

function listTemplate() {
  if (!fs.existsSync(templateRoot))
    fail(`Template directory does not exist: ${templateRoot}`);

  const directories = [];
  const files = [];
  const visit = (directory, relativeDirectory = "") => {
    const entries = fs
      .readdirSync(directory, { withFileTypes: true })
      .sort((left, right) => left.name.localeCompare(right.name));
    for (const entry of entries) {
      const relative = path.join(relativeDirectory, entry.name);
      if (entry.isDirectory()) {
        directories.push(relative);
        visit(path.join(directory, entry.name), relative);
      } else if (entry.isFile()) {
        files.push(relative);
      } else {
        fail(`Template entry must be a file or directory: ${relative}`);
      }
    }
  };

  visit(templateRoot);
  if (!files.includes("package.json"))
    fail(`Template must contain package.json: ${templateRoot}`);
  const manifest = JSON.parse(
    fs.readFileSync(path.join(templateRoot, "package.json"), "utf8"),
  );
  if (manifest === null || Array.isArray(manifest) || typeof manifest !== "object")
    fail(`Template package.json must contain a JSON object: ${templateRoot}`);
  return { directories, files };
}

function displayPath(relative) {
  return relative.split(path.sep).join("/");
}

function validateRequest(options) {
  if (options.slug === undefined) fail("A package slug is required.");
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/u.test(options.slug))
    fail(
      "The package slug must contain only lowercase letters, digits, and single hyphens.",
    );

  const target = path.resolve(packagesRoot, options.slug);
  assertInside(packagesRoot, target, "The package target");
  if (fs.existsSync(target)) fail(`Package directory already exists: ${target}`);

  const packageName = `@samchon/novel-${options.slug}`;
  if (packageNamesInWorkspace().includes(packageName))
    fail(`Workspace package name already exists: ${packageName}`);

  const template = listTemplate();
  for (const relative of [...template.directories, ...template.files])
    assertInside(target, path.resolve(target, relative), `File ${relative}`);

  return { packageName, target, template };
}

function writeAtomically(target, packageName) {
  fs.mkdirSync(packagesRoot, { recursive: true });
  const temporary = fs.mkdtempSync(
    path.join(packagesRoot, ".create-novel-package-"),
  );
  try {
    fs.cpSync(templateRoot, temporary, {
      errorOnExist: true,
      force: false,
      recursive: true,
    });

    const manifestPath = path.join(temporary, "package.json");
    const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
    manifest.name = packageName;
    fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");

    if (fs.existsSync(target)) fail(`Package directory already exists: ${target}`);
    fs.renameSync(temporary, target);
  } catch (error) {
    fs.rmSync(temporary, { force: true, recursive: true });
    throw error;
  }
}

function main() {
  const options = parseArguments(process.argv.slice(2));
  if (options.help) {
    process.stdout.write(HELP);
    return;
  }

  const { packageName, target, template } = validateRequest(options);
  if (options.dryRun) {
    process.stdout.write(`Dry run: would create ${packageName} at ${target}\n`);
    for (const relative of template.directories)
      process.stdout.write(`  ${displayPath(relative)}/\n`);
    for (const relative of template.files)
      process.stdout.write(`  ${displayPath(relative)}\n`);
    return;
  }

  writeAtomically(target, packageName);
  process.stdout.write(`Created ${packageName} at ${target}\n`);
  process.stdout.write("Next: run pnpm install, then pnpm build.\n");
}

try {
  main();
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(`create-novel-package: ${message}\n\n${HELP}`);
  process.exitCode = 1;
}
