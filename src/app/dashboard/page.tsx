import { requireAuth } from "@/lib/auth-guard";
import {
  ArrowDownLeft,
  ArrowUpRight,
  PiggyBank,
  Wallet,
} from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import ExpenseCategories from "@/components/dashboard/ExpenseCategories";

export const instant = false;

const demoTransactions = [
  { name: "Salário", category: "Receita", date: "05/10/2026", value: 4500, type: "income" },
  { name: "Mercado", category: "Alimentação", date: "07/10/2026", value: -320, type: "expense" },
  { name: "Internet", category: "Moradia", date: "09/10/2026", value: -110, type: "expense" },
  { name: "Freelance", category: "Receita", date: "12/10/2026", value: 700, type: "income" },
];

const formatCurrency = (value: number) =>
  value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

const cards = [
  {
    label: "Saldo disponível",
    value: 8450,
    icon: Wallet,
    color: "text-cyan-300",
    description: "Exemplo de saldo",
  },
  {
    label: "Receitas do mês",
    value: 5200,
    icon: ArrowDownLeft,
    color: "text-emerald-400",
    description: "Exemplo de receitas",
  },
  {
    label: "Despesas do mês",
    value: 2100,
    icon: ArrowUpRight,
    color: "text-rose-400",
    description: "Exemplo de despesas",
  },
  {
    label: "Total nos cofres",
    value: 1800,
    icon: PiggyBank,
    color: "text-violet-400",
    description: "Exemplo de reserva",
  },
];

const months = [
  { label: "Mai", value: 36 },
  { label: "Jun", value: 52 },
  { label: "Jul", value: 44 },
  { label: "Ago", value: 68 },
  { label: "Set", value: 58 },
  { label: "Out", value: 82 },
];

export default async function DashboardPage() {
  const user = await requireAuth();
  return (
    <div className="min-h-screen bg-[#080D18] text-slate-100 md:flex">
      <Sidebar />

      <main className="min-w-0 flex-1">
        <Header />

        <div className="mx-auto max-w-[1600px] space-y-7 p-5 sm:p-8">
          <section className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm text-slate-400">
                Quarta-feira, 14 de outubro de 2026
              </p>
              <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
                Olá{user.name ? `, ${user.name}` : ""}! Seu dinheiro, em perspectiva.
              </h1>
              <p className="mt-2 text-sm text-slate-400">
                Acompanhe seu patrimônio e organize suas finanças.
              </p>
            </div>

            <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-2 text-xs text-amber-300">
              Ambiente demonstrativo
            </span>
          </section>

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {cards.map((card) => {
              const Icon = card.icon;

              return (
                <article
                  key={card.label}
                  className="rounded-2xl border border-white/10 bg-[#101B2B] p-5 transition hover:border-cyan-400/30"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-400">{card.label}</p>
                    <Icon size={20} className={card.color} />
                  </div>

                  <p className="mt-5 text-2xl font-bold tracking-tight">
                    {formatCurrency(card.value)}
                  </p>

                  <p className="mt-2 text-xs text-slate-500">
                    {card.description}
                  </p>
                </article>
              );
            })}
          </section>

          <section className="grid gap-5 xl:grid-cols-[1.6fr_1fr]">
            <article className="rounded-2xl border border-white/10 bg-[#101B2B] p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="font-semibold">Evolução financeira</h2>
                  <p className="mt-1 text-sm text-slate-400">
                    Prévia da evolução mensal
                  </p>
                </div>

                <span className="rounded-lg border border-white/10 px-3 py-2 text-xs text-slate-300">
                  Últimos 6 meses
                </span>
              </div>

              <div className="mt-8 flex h-48 items-end justify-between gap-3 border-b border-white/10">
                {months.map((month) => (
                  <div
                    key={month.label}
                    className="flex h-full flex-1 flex-col items-center justify-end gap-3"
                  >
                    <div
                      className="w-full max-w-12 rounded-t-lg bg-gradient-to-t from-cyan-600 to-cyan-300 opacity-90"
                      style={{ height: `${month.value}%` }}
                    />
                    <span className="mb-2 text-xs text-slate-500">
                      {month.label}
                    </span>
                  </div>
                ))}
              </div>

              <p className="mt-4 text-xs text-slate-500">
                Gráfico ilustrativo. Será alimentado pelo histórico financeiro
                real nas próximas etapas.
              </p>
            </article>

            <ExpenseCategories />
          </section>

          <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#101B2B]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 p-5">
              <div>
                <h2 className="font-semibold">Transações recentes</h2>
                <p className="mt-1 text-sm text-slate-400">
                  Exemplos de movimentações financeiras
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[520px] text-left text-sm">
                <thead className="bg-white/[0.02] text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-5 py-4 font-medium">Descrição</th>
                    <th className="px-5 py-4 font-medium">Categoria</th>
                    <th className="px-5 py-4 font-medium">Data</th>
                    <th className="px-5 py-4 text-right font-medium">Valor</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/5">
                  {demoTransactions.map((transaction) => (
                    <tr key={transaction.name}>
                      <td className="px-5 py-4 font-medium text-slate-200">
                        {transaction.name}
                      </td>
                      <td className="px-5 py-4 text-slate-400">
                        {transaction.category}
                      </td>
                      <td className="px-5 py-4 text-slate-400">
                        {transaction.date}
                      </td>
                      <td
                        className={`px-5 py-4 text-right font-medium ${transaction.type === "income"
                          ? "text-emerald-400"
                          : "text-rose-400"
                          }`}
                      >
                        {transaction.value > 0 ? "+" : ""}
                        {formatCurrency(transaction.value)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="border-t border-white/10 px-5 py-3 text-xs text-slate-500">
              Os registros desta tela são fictícios e não devem ser usados
              como fonte de saldo ou patrimônio.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
