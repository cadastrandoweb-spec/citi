import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { SITE } from "@/lib/site";

const schema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email().max(120),
  phone: z.string().max(40).optional().default(""),
  subject: z.string().max(120).optional().default("Lead - Blog"),
  body: z.string().min(10).max(2000),
  postSlug: z.string().nullable().optional().default(null),
});

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Dados inválidos. Verifique os campos e tente novamente." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "Serviço de e-mail não configurado. Defina RESEND_API_KEY nas variáveis de ambiente.",
      },
      { status: 500 },
    );
  }

  const resend = new Resend(apiKey);
  const { name, email, phone, subject, body, postSlug } = parsed.data;

  const from = process.env.RESEND_FROM ?? `Citi Imóveis <no-reply@${SITE.domain}>`;
  const to = process.env.CONTACT_TO ?? SITE.contactEmail;

  await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject: subject || "Lead - Blog",
    text: [
      `Nome: ${name}`,
      `E-mail: ${email}`,
      phone ? `Telefone/WhatsApp: ${phone}` : null,
      postSlug ? `Post: ${postSlug}` : null,
      "---",
      body,
    ]
      .filter(Boolean)
      .join("\n"),
  });

  return NextResponse.json({ ok: true });
}
