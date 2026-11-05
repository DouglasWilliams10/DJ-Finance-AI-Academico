
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { TransactionType } from "@/generated/prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";

const transactionSchema = z.object({
  description: z.string().trim().min(2).max(150),
  amount: z.union([z.string(), z.number()]).refine((value) => {
    const amount = Number(value);
    return Number.isFinite(amount) && amount > 0;
  }, "O valor deve ser maior que zero."),
  type: z.enum(["INCOME", "EXPENSE"]),
  date: z.string().optional(),
  notes: z.string().trim().max(2000).nullable().optional(),
  categoryId: z.string().min(1).nullable().optional(),
  currency: z.string().length(3).regex(/^[A-Z]{3}$/).optional(),
});

export async function GET(request: Request) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json(
        { error: "Autenticação necessária." },
        { status: 401 },
      );
    }

    const { searchParams } = new URL(request.url);
    const typeParam = searchParams.get("type");
    const limitParam = searchParams.get("limit");

    if (
      typeParam &&
      typeParam !== "INCOME" &&
      typeParam !== "EXPENSE"
    ) {
      return NextResponse.json(
        { error: "Tipo de transação inválido." },
        { status: 400 },
      );
    }

    const limit = limitParam === null ? 50 : Number(limitParam);

    if (!Number.isInteger(limit) || limit < 1 || limit > 100) {
      return NextResponse.json(
        { error: "O limite deve ser um número entre 1 e 100." },
        { status: 400 },
      );
    }

    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
        ...(typeParam ? { type: typeParam as TransactionType } : {}),
      },
      orderBy: { date: "desc" },
      take: limit,
      include: {
        category: {
          select: { id: true, name: true },
        },
      },
    });

    return NextResponse.json({ data: transactions });
  } catch (error) {
    console.error("Erro ao listar transações:", error);

    return NextResponse.json(
      { error: "Não foi possível listar as transações." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json(
        { error: "Autenticação necessária." },
        { status: 401 },
      );
    }

    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "O corpo da requisição deve conter JSON válido." },
        { status: 400 },
      );
    }

    const parsed = transactionSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Dados da transação inválidos.",
          details: parsed.error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
          })),
        },
        { status: 400 },
      );
    }

    const data = parsed.data;

    if (data.date && Number.isNaN(Date.parse(data.date))) {
      return NextResponse.json(
        { error: "A data informada é inválida." },
        { status: 400 },
      );
    }

    if (data.categoryId) {
      const category = await prisma.category.findFirst({
        where: {
          id: data.categoryId,
          userId,
        },
        select: { id: true },
      });

      if (!category) {
        return NextResponse.json(
          { error: "Categoria não encontrada." },
          { status: 400 },
        );
      }
    }

    const transaction = await prisma.transaction.create({
      data: {
        description: data.description,
        amount: data.amount.toString(),
        currency: data.currency ?? "BRL",
        type: data.type,
        date: data.date ? new Date(data.date) : new Date(),
        notes: data.notes ?? null,
        categoryId: data.categoryId ?? null,
        userId,
      },
      include: {
        category: {
          select: { id: true, name: true },
        },
      },
    });

    return NextResponse.json(
      { message: "Transação criada com sucesso.", data: transaction },
      { status: 201 },
    );
  } catch (error) {
    console.error("Erro ao criar transação:", error);

    return NextResponse.json(
      { error: "Não foi possível criar a transação." },
      { status: 500 },
    );
  }
}
