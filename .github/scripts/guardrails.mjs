// Brand guardrails for the Searchscope website (cms.md section 6).
//
// Reads a unified=0 git diff on stdin and checks only the ADDED lines, so the
// rule is enforced on every change without needing a clean baseline. Run one
// mode per CI job so each surfaces as its own pass/fail row on the CMS change
// card:
//
//   node .github/scripts/guardrails.mjs em-dash < pr.diff
//   node .github/scripts/guardrails.mjs cta     < pr.diff
//
// Exit 0 = pass, exit 1 = the change breaks a rule (with the offending lines).

const mode = process.argv[2];

function readStdin() {
  return new Promise((resolve) => {
    let data = "";
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", (c) => (data += c));
    process.stdin.on("end", () => resolve(data));
    // A PR that touches nothing still resolves (empty diff).
    if (process.stdin.isTTY) resolve("");
  });
}

/** Pull the added lines out of a unified diff, tagged with their file path. */
function addedLines(diff) {
  const out = [];
  let file = "unknown";
  for (const line of diff.split("\n")) {
    if (line.startsWith("+++ b/")) {
      file = line.slice(6);
      continue;
    }
    if (line.startsWith("+++") || line.startsWith("+++ ")) continue;
    if (line.startsWith("+") && !line.startsWith("+++")) {
      out.push({ file, text: line.slice(1) });
    }
  }
  return out;
}

// An em dash (U+2014). The site uses commas, colons, semicolons or parentheses.
const EM_DASH = /—/;

// A buy / pricing / self-serve flow: Searchscope has no checkout, and every CTA
// ends at /contact. Match forbidden link targets and explicit purchase CTAs.
const CTA_LINK =
  /(?:href|to|url|path|action)\s*[=:]\s*["'`][^"'`]*\/(?:pricing|buy|checkout|sign-?up|register|cart|subscribe|billing|trial)\b/i;
const CTA_PHRASE =
  /\b(?:buy now|add to cart|start (?:your )?(?:free )?trial|sign up|create an account|subscribe now|start free|get started free)\b/i;

const CHECKS = {
  "em-dash": {
    test: (t) => EM_DASH.test(t),
    fail: "Found an em dash in added copy. Use a comma, colon, semicolon or parentheses instead.",
    pass: "No em dashes added.",
  },
  cta: {
    test: (t) => CTA_LINK.test(t) || CTA_PHRASE.test(t),
    fail:
      "This looks like a buy, pricing or self-serve flow. Searchscope is not a product you can buy; every CTA ends at /contact.",
    pass: "No pricing or purchase CTAs added.",
  },
};

async function main() {
  const check = CHECKS[mode];
  if (!check) {
    console.error(`Unknown guardrail mode: ${mode}. Use "em-dash" or "cta".`);
    process.exit(2);
  }

  const diff = await readStdin();
  const offenders = addedLines(diff).filter((l) => check.test(l.text));

  if (offenders.length > 0) {
    console.error(check.fail);
    console.error("");
    for (const o of offenders.slice(0, 40)) {
      console.error(`  ${o.file}: ${o.text.trim()}`);
    }
    process.exit(1);
  }

  console.log(check.pass);
}

main();
