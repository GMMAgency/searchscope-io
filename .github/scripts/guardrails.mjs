// Brand guardrails for the Searchscope website (cms.md section 6).
//
// Reads a unified=0 git diff on stdin and checks only the ADDED lines, so the
// rule is enforced on every change without needing a clean baseline. Run one
// mode per CI job so each surfaces as its own pass/fail row on the CMS change
// card:
//
//   node .github/scripts/guardrails.mjs em-dash < pr.diff
//   node .github/scripts/guardrails.mjs cta     < pr.diff   (price / term claims)
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

// Searchscope is a subscription product, so sign-up, pricing and checkout flows
// are allowed. What is NOT allowed is stating commercial terms that have not
// been confirmed: a specific price, a named plan, or a billing period. Those
// are the claims that cause real damage if they ship wrong, so they are what
// CI checks. Link targets are no longer restricted.
const PRICE_CLAIM =
  /(?:[$£€]\s?\d|\b\d+(?:\.\d{2})?\s*(?:USD|GBP|EUR)\b)\s*(?:\/|\bper\b|\ba\b)?\s*(?:mo|month|monthly|yr|year|annually|seat|user)?/i;
const TERM_CLAIM =
  /\b(?:\d+[- ]day free trial|free forever|cancel anytime|no credit card required)\b/i;

const CHECKS = {
  "em-dash": {
    test: (t) => EM_DASH.test(t),
    fail: "Found an em dash in added copy. Use a comma, colon, semicolon or parentheses instead.",
    pass: "No em dashes added.",
  },
  cta: {
    test: (t) => PRICE_CLAIM.test(t) || TERM_CLAIM.test(t),
    fail:
      "This states a price or a commercial term. Sign-up and checkout flows are fine, but a specific price, plan or billing promise must be confirmed by a human before it ships. Remove it, or approve it and re-run.",
    pass: "No unconfirmed prices or commercial terms added.",
  },
};

async function main() {
  const check = CHECKS[mode];
  if (!check) {
    console.error(`Unknown guardrail mode: ${mode}. Use "em-dash" or "cta".`);
    process.exit(2);
  }

  const diff = await readStdin();

  // The guardrail script states the forbidden patterns verbatim, so it would
  // always flag itself. Exempt it; changes to the rules get human review.
  const SELF = ".github/scripts/guardrails.mjs";

  const offenders = addedLines(diff)
    .filter((l) => l.file !== SELF)
    .filter((l) => check.test(l.text));

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
