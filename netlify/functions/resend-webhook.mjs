/**
 * Resend calls this when something goes wrong with an email we sent.
 *
 * Today it only tells a human. A spam complaint currently reaches nobody, and
 * while the ten optional emails still have no unsubscribe, a complaint is the
 * only signal we get that the volume is hurting. Knowing about it beats acting
 * on it automatically, for now.
 *
 * The muting belongs in the app, not here: a complaint should stop everything
 * optional for that address, and this function can't reach user_profiles. When
 * that lands, this stays as the alert and the app does the suppressing.
 *
 * Two rules:
 *
 * 1. VERIFY EVERY REQUEST. The URL is public, so without the signature check
 *    anyone could post a fake complaint. Unverified requests get a 401 and go
 *    no further.
 *
 * 2. ALWAYS RETURN 200 ONCE VERIFIED. Resend retries on a non-2xx, so a bug in
 *    our alerting shouldn't turn one complaint into a queue of retries. Log and
 *    return.
 *
 * Environment variables required (set in Netlify, not in this repo):
 *   RESEND_API_KEY          the existing sending key
 *   RESEND_WEBHOOK_SECRET   the endpoint's signing secret, "whsec_..."
 *   ALERT_EMAIL             optional, defaults to clients@growthmindedmarketing.com
 */

import crypto from 'node:crypto';

const ALERT_TO = process.env.ALERT_EMAIL || 'clients@growthmindedmarketing.com';
const ALERT_FROM = 'Searchscope alerts <notifications@searchscope.io>';

/* Five minutes, matching Svix's own tolerance. An intercepted payload replayed
 * later still carries a valid signature, so the timestamp is what stops it. */
const TOLERANCE_MS = 5 * 60 * 1000;

/* What each event means in plain words, and how much we care. */
const EVENTS = {
  'email.complained': {
    weight: 'Complaint',
    line: 'marked an email as spam. Resend has suppressed the address automatically.',
  },
  'email.bounced': {
    weight: 'Bounce',
    line: 'could not be delivered to. The address is now suppressed.',
  },
  'suppression.added': {
    weight: 'Suppressed',
    line: 'was added to the suppression list, so nothing more will reach it.',
  },
};

/**
 * Svix signature verification, done by hand so the site gains no dependency.
 * The signed content is id.timestamp.body, and the body must be the RAW string:
 * parsing it to JSON and stringifying again changes bytes and breaks the check.
 */
function verify(rawBody, headers, secret) {
  const id = headers.get('svix-id');
  const timestamp = headers.get('svix-timestamp');
  const signature = headers.get('svix-signature');
  if (!id || !timestamp || !signature) return false;

  const sentAt = Number(timestamp) * 1000;
  if (!Number.isFinite(sentAt) || Math.abs(Date.now() - sentAt) > TOLERANCE_MS) return false;

  const key = Buffer.from(secret.replace(/^whsec_/, ''), 'base64');
  const expected = crypto
    .createHmac('sha256', key)
    .update(`${id}.${timestamp}.${rawBody}`)
    .digest('base64');

  /* The header carries a space-separated list, each "v1,<signature>", because
   * a secret can be rotated with both live for a while. Any match is a pass. */
  return signature.split(' ').some((part) => {
    const value = part.split(',')[1];
    if (!value || value.length !== expected.length) return false;
    return crypto.timingSafeEqual(Buffer.from(value), Buffer.from(expected));
  });
}

async function sendAlert(subject, text) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('resend-webhook: RESEND_API_KEY is not set, cannot alert');
    return;
  }
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: ALERT_FROM, to: [ALERT_TO], subject, text }),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    console.error(`resend-webhook: alert failed ${res.status} :: ${detail.slice(0, 300)}`);
  }
}

export default async (req) => {
  const secret = process.env.RESEND_WEBHOOK_SECRET;
  if (!secret) {
    console.error('resend-webhook: RESEND_WEBHOOK_SECRET is not set');
    return new Response('not configured', { status: 500 });
  }

  const rawBody = await req.text();
  if (!verify(rawBody, req.headers, secret)) {
    console.warn('resend-webhook: signature did not verify, rejecting');
    return new Response('invalid signature', { status: 401 });
  }

  try {
    const event = JSON.parse(rawBody);
    const type = event?.type;
    const known = EVENTS[type];

    if (!known) {
      console.log(`resend-webhook: ignoring "${type}"`);
      return new Response('ok', { status: 200 });
    }

    const d = event.data || {};
    const who = Array.isArray(d.to) ? d.to.join(', ') : d.to || d.email || 'an unknown address';
    const emailSubject = d.subject || 'no subject recorded';
    const from = d.from || 'unknown sender';

    const text = [
      `${who} ${known.line}`,
      '',
      `Email:   ${emailSubject}`,
      `From:    ${from}`,
      `Event:   ${type}`,
      `When:    ${event.created_at || d.created_at || 'not recorded'}`,
      '',
      type === 'email.complained'
        ? 'Worth looking at what else that address received recently. A complaint usually follows volume, not one email.'
        : '',
    ]
      .filter(Boolean)
      .join('\n');

    await sendAlert(`${known.weight}: ${who}`, text);
    console.log(`resend-webhook: alerted on ${type} for ${who}`);
  } catch (err) {
    console.error('resend-webhook failed:', err?.message || err);
  }

  return new Response('ok', { status: 200 });
};
