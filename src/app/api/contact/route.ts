import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/contact";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "ข้อมูลไม่ถูกต้อง" },
      { status: 400 }
    );
  }

  // Honeypot filled: pretend success but do not send any email.
  // Checked before validation so any honeypot value (including long/bot-like
  // strings that would fail schema validation) is treated as a bot.
  const raw =
    body && typeof body === "object"
      ? (body as Record<string, unknown>)
      : null;

  if (
    raw &&
    typeof raw.website === "string" &&
    raw.website.trim().length > 0
  ) {
    return NextResponse.json({ message: "success" });
  }

  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: "ข้อมูลไม่ถูกต้อง",
        errors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  const { name, email, subject, message } = parsed.data;

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !from || !to) {
    return NextResponse.json(
      { message: "ส่งข้อความไม่สำเร็จ โปรดลองอีกครั้ง" },
      { status: 500 }
    );
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `[ติดต่อร้าน] ${subject}`,
      text: `ชื่อ: ${name}\nอีเมล: ${email}\nหัวข้อ: ${subject}\n\n${message}`,
    });

    return NextResponse.json({ message: "success" });
  } catch {
    return NextResponse.json(
      { message: "ส่งข้อความไม่สำเร็จ โปรดลองอีกครั้ง" },
      { status: 500 }
    );
  }
}