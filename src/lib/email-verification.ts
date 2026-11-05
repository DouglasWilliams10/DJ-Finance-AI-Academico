
import { createHash, randomBytes } from "node:crypto";
import { prisma } from "@/lib/prisma";
import { sendVerificationEmail } from "@/lib/email";

const TOKEN_LIFETIME_MS = 24 * 60 * 60 * 1000;

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export async function createEmailVerification(
  user: { id: string; name: string | null; email: string },
) {
  const rawToken = randomBytes(32).toString("hex");
  const hashedToken = hashToken(rawToken);
  const expires = new Date(Date.now() + TOKEN_LIFETIME_MS);

  await prisma.verificationToken.deleteMany({
    where: { identifier: user.email },
  });

  await prisma.verificationToken.create({
    data: {
      identifier: user.email,
      token: hashedToken,
      expires,
    },
  });

  const baseUrl =
    process.env.AUTH_URL ??
    process.env.NEXTAUTH_URL ??
    "http://localhost:3000";

  const verificationUrl = new URL("/verify-email", baseUrl);
  verificationUrl.searchParams.set("token", rawToken);
  verificationUrl.searchParams.set("email", user.email);

  try {
    await sendVerificationEmail({
      email: user.email,
      name: user.name ?? "Usuário",
      verificationUrl: verificationUrl.toString(),
    });
  } catch (error) {
    await prisma.verificationToken.deleteMany({
      where: {
        identifier: user.email,
        token: hashedToken,
      },
    });

    throw error;
  }
}

export async function verifyEmailToken(
  email: string,
  rawToken: string,
): Promise<boolean> {
  const normalizedEmail = email.trim().toLowerCase();

  if (
    !normalizedEmail ||
    !/^[a-f0-9]{64}$/i.test(rawToken)
  ) {
    return false;
  }

  const hashedToken = hashToken(rawToken);

  return prisma.$transaction(async (tx) => {
    const tokenRecord = await tx.verificationToken.findUnique({
      where: { token: hashedToken },
    });

    if (
      !tokenRecord ||
      tokenRecord.identifier !== normalizedEmail ||
      tokenRecord.expires <= new Date()
    ) {
      return false;
    }

    const user = await tx.user.findUnique({
      where: { email: normalizedEmail },
      select: { id: true, emailVerified: true },
    });

    if (!user) {
      await tx.verificationToken.delete({
        where: { token: hashedToken },
      });

      return false;
    }

    if (!user.emailVerified) {
      await tx.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    }

    await tx.verificationToken.delete({
      where: { token: hashedToken },
    });

    return true;
  });
}
