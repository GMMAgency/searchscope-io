/**
 * Netlify fires this automatically on every verified form submission.
 * It adds the person to a Resend audience; a Resend Automation enrols them
 * from there.
 *
 * Two rules this file must never break:
 *
 * 1. NEVER FAIL THE SUBMISSION. Netlify has already stored the submission by
 *    the time this runs, and the visitor has already seen the thank-you page.
 *    If Resend is down, the lead is still safe in the Netlify dashboard, so we
 *    log and return 200 rather than throwing.
 *
 * 2. NEVER SEND MORE THAN THE PERSON EXPECTS. Only the fields listed in
 *    SAFE_FIELDS travel. The free-text problem field and the visitor's own
 *    domain stay in Netlify.
 *
 * Environment variables required (set in Netlify, not in this repo):
 *   RESEND_API_KEY
 *   RESEND_AUDIENCE_BETA
 *   RESEND_AUDIENCE_DEMO
 *   RESEND_AUDIENCE_CHECKER
 */

const AUDIENCE_BY_FORM = {
  'beta': 'RESEND_AUDIENCE_BETA',
  'agency-demo': 'RESEND_AUDIENCE_DEMO',
  'ai-visibility-check': 'RESEND_AUDIENCE_CHECKER',
};

/* Everything else in the payload is deliberately dropped. The visitor's own
 * website stays in Netlify with the free-text fields: only banded, categorical
 * answers travel, because those are what segments are built from. */
const SAFE_FIELDS = ['portfolio', 'role'];

/*
 * The checker asks for one report. A nurture sequence is not what that person
 * requested, so it is gated on an explicit unticked checkbox. Absent box means
 * absent consent: the contact is created unsubscribed, so Resend will deliver
 * the report and nothing else.
 */
function marketingConsent(form, data) {
  if (form !== 'ai-visibility-check') return true;
  return data.marketing_optin === 'yes';
}

function splitName(full) {
  const parts = String(full || '').trim().split(/\s+/);
  if (!parts[0]) return { firstName: '', lastName: '' };
  return { firstName: parts[0], lastName: parts.slice(1).join(' ') };
}

export default async (req) => {
  try {
    const body = await req.json();
    const payload = body?.payload || {};
    const form = payload.form_name;
    const data = payload.data || {};

    const audienceEnv = AUDIENCE_BY_FORM[form];
    if (!audienceEnv) {
      console.log(`submission-created: no audience mapped for form "${form}", skipping`);
      return new Response('ok', { status: 200 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const audienceId = process.env[audienceEnv];
    if (!apiKey || !audienceId) {
      console.error(`submission-created: missing RESEND_API_KEY or ${audienceEnv}`);
      return new Response('ok', { status: 200 });
    }

    const email = String(data.email || payload.email || '').trim().toLowerCase();
    if (!email) {
      console.error(`submission-created: no email on a "${form}" submission`);
      return new Response('ok', { status: 200 });
    }

    /*
     * Netlify promotes some field names (name, email, subject and friends) to
     * the top level of the payload, and a field literally called "name" can
     * end up there rather than in data. Read every plausible location instead
     * of assuming one: a curl against Resend proved the API and the field
     * names are correct, and the Netlify submission record proved the name was
     * captured, so the only thing left in between was where we looked for it.
     */
    const rawName =
      data.name ||
      payload.name ||
      [data.first_name, data.last_name].filter(Boolean).join(' ') ||
      '';

    /* Keys only, never values: these logs must not carry personal data. */
    console.log(
      `submission-created: form=${form} ` +
      `payloadKeys=[${Object.keys(payload).join(',')}] ` +
      `dataKeys=[${Object.keys(data).join(',')}] ` +
      `nameResolved=${Boolean(rawName)}`
    );

    const consented = marketingConsent(form, data);
    const { firstName, lastName } = splitName(rawName);
    const attributes = {};
    for (const f of SAFE_FIELDS) if (data[f]) attributes[f] = String(data[f]);

    /*
     * The REST API takes snake_case. Only the Node SDK accepts firstName and
     * lastName and converts them internally; sending camelCase to the raw
     * endpoint is accepted with a 200 and the names are silently dropped.
     * Custom values go in `properties`, and segment membership is an array in
     * the body rather than a path parameter.
     */
    const res = await fetch('https://api.resend.com/contacts', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        first_name: firstName,
        last_name: lastName,
        unsubscribed: !consented,
        segments: [{ id: audienceId }],
        ...(Object.keys(attributes).length ? { properties: attributes } : {}),
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => '');
      console.error(`submission-created: Resend returned ${res.status} for "${form}" :: ${detail.slice(0, 300)}`);
    } else {
      console.log(`submission-created: added a contact to ${form} (marketing consent: ${consented})`);
    }
  } catch (err) {
    console.error('submission-created failed:', err?.message || err);
  }

  return new Response('ok', { status: 200 });
};
