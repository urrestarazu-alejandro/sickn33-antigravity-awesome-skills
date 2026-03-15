const assert = require("assert");
const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "../..", "..");

const apifySkill = fs.readFileSync(
  path.join(repoRoot, "skills", "apify-actorization", "SKILL.md"),
  "utf8",
);
const audioExample = fs.readFileSync(
  path.join(repoRoot, "skills", "audio-transcriber", "examples", "basic-transcription.sh"),
  "utf8",
);

assert.strictEqual(/\|\s*(bash|sh)\b/.test(apifySkill), false, "SKILL.md must not recommend pipe-to-shell installs");
assert.strictEqual(/\|\s*iex\b/i.test(apifySkill), false, "SKILL.md must not recommend PowerShell pipe-to-iex installs");
assert.strictEqual(/apify login -t\b/.test(apifySkill), false, "SKILL.md must not put tokens on the command line");

assert.match(audioExample, /python3 << 'EOF'/, "audio example should use a quoted heredoc for Python");
assert.match(audioExample, /AUDIO_FILE_ENV/, "audio example should pass shell variables through the environment");
