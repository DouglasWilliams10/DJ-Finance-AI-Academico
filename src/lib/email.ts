
import { Resend } from "resend";


type SendVerificationEmailParams = {
  email: string;
  name: string;
  verificationUrl: string;
};

export async function sendVerificationEmail({
  email,
  name,
  verificationUrl,
}: SendVerificationEmailParams) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;

  if (!apiKey || !from) {
    throw new Error(
      "As configurações de envio de e-mail não estão definidas.",
    );
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from,
    to: email,
    subject: "Confirme seu e-mail — DW Finance AI",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #0f172a;">
        <h1 style="color: #0891b2;">DW Finance AI</h1>

        <p>Olá, ${escapeHtml(name)}!</p>

        <p>
          Recebemos seu cadastro. Para confirmar seu endereço de e-mail,
          clique no botão abaixo:
        </p>

        <p style="margin: 28px 0;">
          <a
            href="${escapeHtml(verificationUrl)}"
            style="background: #22d3ee; color: #082f49; padding: 12px 20px; border-radius: 8px; text-decoration: none; font-weight: bold;"
          >
            Confirmar meu e-mail
          </a>
        </p>

        <p>
          Se você não solicitou este cadastro, ignore esta mensagem.
        </p>

        <p style="color: #64748b; font-size: 12px;">
          Por segurança, o link terá validade limitada.
        </p>
      </div>
    `,
  });

  if (error) {
    console.error("Falha no envio do e-mail de confirmação:", error.name);
    throw new Error("Não foi possível enviar o e-mail de confirmação.");
  }
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[character];
  });
}
