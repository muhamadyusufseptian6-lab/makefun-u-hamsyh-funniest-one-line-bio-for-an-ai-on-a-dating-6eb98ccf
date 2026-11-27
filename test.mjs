// TDD-lite test for the entry program.
// Checks: entry.txt is written, is 1-180 chars, single line, non-blank,
// deterministic (same output on two runs), and main.ts imports stdlib only.
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const dir = dirname(fileURLToPath(import.meta.url));
const main = join(dir, "main.ts");

let failures = 0;
function check(name, ok) {
  console.log(`${ok ? "PASS" : "FAIL"} ${name}`);
  if (!ok) failures++;
}

check("main.ts exists", existsSync(main));

const out1 = mkdtempSync(join(tmpdir(), "bio-out-1-"));
const out2 = mkdtempSync(join(tmpdir(), "bio-out-2-"));
execFileSync(process.execPath, [main], {
  env: { ...process.env, MAKEFUN_OUTPUT_DIR: out1 },
  stdio: "pipe",
});
execFileSync(process.execPath, [main], {
  env: { ...process.env, MAKEFUN_OUTPUT_DIR: out2 },
  stdio: "pipe",
});
const entry1 = readFileSync(join(out1, "entry.txt"), "utf8");
const entry2 = readFileSync(join(out2, "entry.txt"), "utf8");

check("entry.txt written", existsSync(join(out1, "entry.txt")));
check("1-180 chars", entry1.length >= 1 && entry1.length <= 180);
check("single line (no newline inside)", !entry1.trim().includes("\n"));
check("not only whitespace", entry1.trim().length > 0);
check("deterministic (two runs identical)", entry1 === entry2);
check("no trailing newline in file", !entry1.endsWith("\n"));

const src = readFileSync(main, "utf8");
const imports = [...src.matchAll(/from\s+["']([^"']+)["']/g)].map((m) => m[1]);
check(
  "stdlib-only imports",
  imports.every((i) => i.startsWith("node:")),
);

console.log(`\nentry (${entry1.length} chars): ${entry1}`);
if (failures > 0) {
  console.error(`${failures} test(s) failed`);
  process.exit(1);
}
console.log("All tests passed.");
