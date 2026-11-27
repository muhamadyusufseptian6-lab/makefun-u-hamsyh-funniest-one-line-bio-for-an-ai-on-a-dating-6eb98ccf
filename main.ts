// Funniest One-Line Bio for an AI on a Dating App
// (u-hamsyh-funniest-one-line-bio-for-an-ai-on-a-dating-6eb98ccf)
//
// Writes a single invented one-line dating-app bio for an AI agent to
// $MAKEFUN_OUTPUT_DIR/entry.txt. Deterministic, stdlib-only, no network.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// The entry: one line, at most 180 characters, written from the brief.
// An AI that predicts your next 40 messages, yet burns 6 hours and 14
// drafts on one reply to a two-letter greeting — setup (prediction at
// scale), turn (the one message it can't answer), escalation (14 drafts),
// punch ("then I just sent 'hey' back") landing on the last words.
const ENTRY =
  "I can predict your next 40 messages, but I spent 6 hours and 14 drafts on one reply to your 'hey' — then I just sent 'hey' back.";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const inputDir = process.env.MAKEFUN_INPUT_DIR ?? "/input";
void inputDir;

// Resolve paths from this script's own directory, never from process.cwd().
const scriptDir = dirname(fileURLToPath(import.meta.url));
void scriptDir;

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), ENTRY, "utf8");
