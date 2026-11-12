const BACKEND_URL =
  process.env.BACKEND_API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8087";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { fullName, email, phone, message } = body;

  if (!fullName?.trim() || !email?.trim() || !phone?.trim() || !message?.trim()) {
    return Response.json({ error: "Name, email, phone and message are required." }, { status: 400 });
  }

  try {
    const backendRes = await fetch(`${BACKEND_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: body.fullName,
        email:    body.email,
        phone:    body.phone,
        company:  body.company  || undefined,
        subject:  body.subject  || undefined,
        message:  body.message,
        // Optional attachments already uploaded to Cloudinary (URL + metadata).
        attachments: Array.isArray(body.attachments) ? body.attachments.slice(0, 5) : [],
        source:   "website",
      }),
    });

    if (!backendRes.ok) {
      const data = await backendRes.json().catch(() => ({}));
      // `fields` = { fieldName: message } when the backend rejected specific
      // fields — the form shows each under its input.
      return Response.json(
        { error: data.error ?? "Failed to submit message.", fields: data.fields ?? undefined },
        { status: backendRes.status },
      );
    }
  } catch (err) {
    console.error("Failed to persist contact to backend:", err);
    return Response.json(
      { error: "Unable to reach the server. Please try again." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
