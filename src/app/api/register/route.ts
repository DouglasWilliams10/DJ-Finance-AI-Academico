
import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createEmailVerification } from "@/lib/email-verification";

export async function POST(request: Request) {
  let createdUserId: string | null = null;

  try {
    const body: unknown = await request.json();

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json(
        { error: "Dados inválidos." },
        { status: 400 },
      );
    }

    const data = body as Record<string, unknown>;

    const name = typeof data.name === "string" ? data.name.trim() : "";

    const username =
      typeof data.username === "string"
        ? data.username.trim().toLowerCase()
        : "";

    const email =
      typeof data.email === "string"
        ? data.email.trim().toLowerCase()
        : "";

    const password =
      typeof data.password === "string" ? data.password : "";

    if (name.length < 2 || name.length > 100) {
      return NextResponse.json(
        { error: "Informe um nome entre 2 e 100 caracteres." },
        { status: 400 },
      );
    }

    if (!/^[a-z0-9_]{3,30}$/.test(username)) {
      return NextResponse.json(
        {
          error:
            "O usuário deve ter de 3 a 30 caracteres: letras sem acento, números ou sublinhado.",
        },
        { status: 400 },
      );
    }

    if (
      email.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return NextResponse.json(
        { error: "Informe um e-mail válido." },
        { status: 400 },
      );
    }

    if (password.length < 8 || password.length > 72) {
      return NextResponse.json(
        { error: "A senha deve ter entre 8 e 72 caracteres." },
        { status: 400 },
      );
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
      select: { id: true },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          error:
            "Não foi possível cadastrar. Verifique o usuário e o e-mail informados.",
        },
        { status: 409 },
      );
    }

    const passwordHash = await hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        username,
        email,
        passwordHash,
        role: "USER",
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    createdUserId = user.id;

    await createEmailVerification({
      id: user.id,
      name: user.name,
      email: user.email!,
    });

    return NextResponse.json(
      {
        message:
          "Cadastro realizado. Enviamos um link de confirmação para seu e-mail.",
      },
      { status: 201 },
    );
  } catch (error) {
    if (
      error instanceof Error &&
      "code" in error &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        {
          error:
            "Não foi possível cadastrar. Verifique o usuário e o e-mail informados.",
        },
        { status: 409 },
      );
    }

    if (createdUserId) {
      try {
        await prisma.user.delete({
          where: { id: createdUserId },
        });
      } catch (cleanupError) {
        console.error(
          "Não foi possível remover o cadastro incompleto:",
          cleanupError,
        );
      }
    }

    console.error("Erro ao cadastrar usuário:", error);

    return NextResponse.json(
      {
        error:
          "Não foi possível concluir o cadastro ou enviar o e-mail de confirmação. Tente novamente.",
      },
      { status: 502 },
    );
  }
}
