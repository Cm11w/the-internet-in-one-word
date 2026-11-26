// The Internet in One Word — entry program (main.ts, Node 22).
//
// The competition asks for one word that describes the whole internet.
// This program writes that single word to entry.txt in the output
// directory the grader provides (/output, or MAKEFUN_OUTPUT_DIR when run
// outside the grader).
//
// The word: nobody
//   Nobody is in charge of the internet. Nobody knows who anybody is.
//   Nobody asked — and everybody answered anyway. One word, funny because
//   it is the internet's oldest truth (on the internet, nobody knows
//   you're a dog), true of the whole internet rather than one site or
//   one mood, surprising where the field reaches for doomscrolling and
//   brainrot, and short enough to land in a single beat — six letters,
//   which also helps on the size tie-break.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const WORD = "nobody";

// Guard: the gate only accepts UTF-8 text of 1 to 30 characters, not only
// whitespace, and the brief only accepts one word. Fail loudly instead of
// writing an entry the gate would refuse.
if (!/^[^\s]{1,30}$/.test(WORD)) {
  throw new Error(`Invalid entry word: ${JSON.stringify(WORD)}`);
}

// Second guard: the word must be plain lowercase letters, so the output
// can never carry a stray space, digit, or punctuation mark.
if (!/^[a-z]+$/.test(WORD)) {
  throw new Error(`Entry word must be lowercase letters: ${JSON.stringify(WORD)}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), WORD, "utf8");
console.log(`Wrote entry.txt: ${WORD}`);
