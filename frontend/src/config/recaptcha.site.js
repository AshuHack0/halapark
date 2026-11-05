/**
 * Public reCAPTCHA site key (safe in browser), from the
 * NEXT_PUBLIC_RECAPTCHA_SITE_KEY env var. It is inlined at build time, so
 * changing it needs a rebuild.
 * Get keys: https://www.google.com/recaptcha/admin
 * Use reCAPTCHA v2 → "I'm not a robot" Checkbox
 */
export const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";
