/**
 * Server-only secret key, from the RECAPTCHA_SECRET_KEY env var. Import only in
 * API routes — never in client components.
 * Get keys: https://www.google.com/recaptcha/admin
 */
export const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY ?? "";
