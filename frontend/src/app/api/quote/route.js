import { RECAPTCHA_SECRET_KEY } from "@/config/recaptcha.secret";

export async function POST(request) {
  const secret = RECAPTCHA_SECRET_KEY;

  if (!secret) {
    return Response.json(
      { error: "reCAPTCHA is not configured on the server." },
      { status: 500 },
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { recaptchaToken, fullName, email, phone, service } = body;

  if (!recaptchaToken) {
    return Response.json({ error: "Captcha is required." }, { status: 400 });
  }

  if (!fullName?.trim() || !email?.trim() || !phone?.trim() || !service?.trim()) {
    return Response.json({ error: "Missing required fields." }, { status: 400 });
  }

  const verifyRes = await fetch(
    "https://www.google.com/recaptcha/api/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret,
        response: recaptchaToken,
      }),
    },
  );

  const verification = await verifyRes.json();

  if (!verification.success) {
    return Response.json(
      { error: "Captcha verification failed. Please try again." },
      { status: 400 },
    );
  }

  // TODO: persist quote (email, CRM, database). Payload available in `body`.
  return Response.json({ ok: true });
}
