import { RECAPTCHA_SECRET_KEY } from "@/config/recaptcha.secret";

const BACKEND_URL =
  process.env.BACKEND_API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8087";

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

  const { recaptchaToken, fullName, email, phone, jobTitle } = body;

  if (!recaptchaToken) {
    return Response.json({ error: "Captcha is required." }, { status: 400 });
  }

  if (!fullName?.trim() || !email?.trim() || !phone?.trim() || !jobTitle?.trim()) {
    return Response.json({ error: "Missing required fields." }, { status: 400 });
  }

  const verifyRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      secret,
      response: recaptchaToken,
    }),
  });

  const verification = await verifyRes.json();

  if (!verification.success) {
    return Response.json(
      { error: "Captcha verification failed. Please try again." },
      { status: 400 },
    );
  }

  try {
    const backendRes = await fetch(`${BACKEND_URL}/api/job-applications`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: body.fullName,
        email: body.email,
        phone: body.phone,
        jobTitle: body.jobTitle,
        department: body.department,
        location: body.location,
        message: body.message,
        linkedIn: body.linkedIn,
        resumeUrl: body.resumeUrl,
        source: "careers",
      }),
    });

    if (!backendRes.ok) {
      const data = await backendRes.json().catch(() => ({}));
      return Response.json(
        { error: data.error ?? "Failed to submit application." },
        { status: backendRes.status },
      );
    }
  } catch (err) {
    console.error("Failed to persist job application to backend:", err);
    return Response.json({ error: "Unable to reach the server. Please try again." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
