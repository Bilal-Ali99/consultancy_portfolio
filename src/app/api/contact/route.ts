import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(4),
  email: z.string().email(),
  projectType: z.enum(["ERPNext / Frappe", "Software Development", "UI/UX", "Machine Learning", "Other"]),
  message: z.string().min(10),
});

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(request: Request) {
  const parsed = contactSchema.safeParse(await request.json().catch(() => null));

  if (!parsed.success) {
    return NextResponse.json({ message: "Invalid contact form data." }, { status: 400 });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!resendApiKey || !toEmail || !fromEmail) {
    return NextResponse.json(
      { message: "Email service is not configured yet." },
      { status: 500 }
    );
  }

  const data = parsed.data;
  const safeName = escapeHtml(data.name);
  const safeEmail = escapeHtml(data.email);
  const safeProjectType = escapeHtml(data.projectType);
  const safeMessage = escapeHtml(data.message).replaceAll("\n", "<br />");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: data.email,
      subject: `New enquiry from ${data.name} - ${data.projectType}`,
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827">
          <h2>New HB Solutions enquiry</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Project Type:</strong> ${safeProjectType}</p>
          <p><strong>Message:</strong></p>
          <p>${safeMessage}</p>
        </div>
      `,
      text: [
        "New HB Solutions enquiry",
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Project Type: ${data.projectType}`,
        "Message:",
        data.message,
      ].join("\n\n"),
    }),
  });

  if (!response.ok) {
    return NextResponse.json(
      { message: "Email could not be sent. Please try again later." },
      { status: 502 }
    );
  }

  return NextResponse.json({ message: "Message sent." });
}
