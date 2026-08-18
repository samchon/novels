#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HELP = `Create an evidence-compiled novel package.

Usage:
  pnpm create:novel <slug> --title <title> --description <description>

Options:
  --title <title>              Human-facing work title (required)
  --description <description>  Short human-facing description (required)
  --dry-run                    Validate and print the files without writing
  -h, --help                   Show this help

Example:
  pnpm create:novel winter-orbit --title "Winter Orbit" --description "A generation-ship mystery"
`;

const packageDirectory = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = path.resolve(packageDirectory, "../..");
const packagesRoot = path.resolve(workspaceRoot, "packages");
const scaffoldDirectories = ["docs/settings"];

function fail(message) {
  throw new Error(message);
}

function takeOptionValue(args, index, option) {
  const value = args[index + 1];
  if (value === undefined || value.startsWith("--"))
    fail(`${option} requires a value.`);
  return value;
}

function parseArguments(args) {
  if (args.includes("--help") || args.includes("-h"))
    return { help: true };

  const result = {
    description: undefined,
    dryRun: false,
    help: false,
    slug: undefined,
    title: undefined,
  };

  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index];
    if (argument === "--dry-run") {
      if (result.dryRun) fail("--dry-run was provided more than once.");
      result.dryRun = true;
    } else if (argument === "--title" || argument === "--description") {
      const key = argument.slice(2);
      if (result[key] !== undefined)
        fail(`${argument} was provided more than once.`);
      result[key] = takeOptionValue(args, index, argument);
      index += 1;
    } else if (argument.startsWith("--title=")) {
      if (result.title !== undefined)
        fail("--title was provided more than once.");
      result.title = argument.slice("--title=".length);
    } else if (argument.startsWith("--description=")) {
      if (result.description !== undefined)
        fail("--description was provided more than once.");
      result.description = argument.slice("--description=".length);
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

function validateText(name, value) {
  if (value === undefined) fail(`--${name} is required.`);
  if (value.length === 0) fail(`--${name} must not be empty.`);
  if (value.trim() !== value)
    fail(`--${name} must not have leading or trailing whitespace.`);
  if (/[\r\n]/u.test(value)) fail(`--${name} must be a single line.`);
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

function createFiles(slug, title, description) {
  const packageName = `@samchon/novel-${slug}`;
  const manifest = {
    private: true,
    name: packageName,
    version: "0.1.0",
    description: `${title}: ${description}`,
    main: "./src/index.ts",
    type: "commonjs",
    scripts: {
      build: "ttsc",
      dev: "ttsc --watch",
    },
    devDependencies: {
      "@samchon/novel-config": "workspace:*",
      "@ttsc/evidence": "catalog:typescript",
      "@ttsc/lint": "catalog:typescript",
      "@types/node": "catalog:utils",
      ttsc: "catalog:typescript",
      typescript: "catalog:typescript",
    },
  };

  return new Map([
    ["package.json", `${JSON.stringify(manifest, null, 2)}\n`],
    [
      "tsconfig.json",
      `${JSON.stringify(
        {
          extends: "../../config/tsconfig.json",
          include: ["src"],
        },
        null,
        2,
      )}\n`,
    ],
    ["src/index.ts", ""],
    [
      "lint.config.ts",
      `import { createLintConfig } from "@samchon/novel-config";

export default createLintConfig({
  location: __dirname,

  // disabled defers complete coverage but permits obvious truthful evidence.
  // Finish the settings canon, then pass "evidence" and finally "review".
  settings: "disabled",

  // Keep disabled until the reviewed settings support a complete storyline;
  // then pass "evidence" and finally "review".
  storylines: "disabled",

  // Keep disabled until the reviewed storyline supports a complete scenario;
  // then pass "evidence" and finally "review".
  scenarios: "disabled",

  // Keep disabled until the reviewed scenario supports a complete manuscript;
  // then pass "evidence" and finally "review".
  manuscripts: "disabled",
});
`,
    ],
  ]);
}

function validateRequest(options) {
  if (options.slug === undefined) fail("A package slug is required.");
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/u.test(options.slug))
    fail(
      "The package slug must contain only lowercase letters, digits, and single hyphens.",
    );
  validateText("title", options.title);
  validateText("description", options.description);

  const target = path.resolve(packagesRoot, options.slug);
  assertInside(packagesRoot, target, "The package target");
  if (fs.existsSync(target)) fail(`Package directory already exists: ${target}`);

  const packageName = `@samchon/novel-${options.slug}`;
  if (packageNamesInWorkspace().includes(packageName))
    fail(`Workspace package name already exists: ${packageName}`);

  const files = createFiles(options.slug, options.title, options.description);
  for (const relative of scaffoldDirectories)
    assertInside(target, path.resolve(target, relative), `Directory ${relative}`);
  for (const relative of files.keys())
    assertInside(target, path.resolve(target, relative), `File ${relative}`);

  return { directories: scaffoldDirectories, files, packageName, target };
}

function writeAtomically(target, directories, files) {
  fs.mkdirSync(packagesRoot, { recursive: true });
  const temporary = fs.mkdtempSync(
    path.join(packagesRoot, ".create-novel-package-"),
  );
  try {
    for (const relative of directories)
      fs.mkdirSync(path.join(temporary, relative), { recursive: true });
    for (const [relative, contents] of files) {
      const destination = path.join(temporary, relative);
      fs.mkdirSync(path.dirname(destination), { recursive: true });
      fs.writeFileSync(destination, contents, { encoding: "utf8", flag: "wx" });
    }
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

  const { directories, files, packageName, target } = validateRequest(options);
  if (options.dryRun) {
    process.stdout.write(`Dry run: would create ${packageName} at ${target}\n`);
    for (const relative of directories) process.stdout.write(`  ${relative}/\n`);
    for (const relative of files.keys()) process.stdout.write(`  ${relative}\n`);
    return;
  }

  writeAtomically(target, directories, files);
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
