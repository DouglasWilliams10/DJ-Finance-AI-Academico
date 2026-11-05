import { requireAuth } from "@/lib/auth-guard";
import Link from "next/link";
import { notFound } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";


export const instant = false;

const sections: Record<string, { title: string; description: string }> = {
  transacoes: {
    title: "Transações",
    description: "Aqui ficará o cadastro e o histórico de receitas e despesas.",
  },
  cofres: {
    title: "Meus cofres",
    description: "Aqui você poderá organizar suas reservas e objetivos financeiros.",
  },
  investimentos: {
    title: "Investimentos",
    description: "Aqui ficará o acompanhamento do patrimônio investido.",
  },
  relatorios: {
    title: "Relatórios financeiros",
    description: "Aqui ficarão os gráficos e o histórico da sua evolução mensal.",
  },
  "assistente-ia": {
    title: "Assistente IA",
    description: "Aqui ficará seu assistente de análise financeira personalizada.",
  },
  settings: {
    title: "Configurações",
    description: "Aqui ficarão as preferências visuais e configurações da conta.",
  },
};

export function generateStaticParams() {
  return Object.keys(sections).map((section) => ({ section }));
}

export default async function SectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  const page = sections[section];

  if (!page) notFound();

  await requireAuth();

  return (
    <div className="min-h-screen bg-[#080D18] text-slate-100 md:flex">
      <Sidebar />

      <main className="min-w-0 flex-1">
        <Header />

        <section className="p-5 sm:p-8">
          <div className="max-w-2xl rounded-2xl border border-white/10 bg-[#101B2B] p-6 sm:p-8">
            <p className="text-sm font-medium text-cyan-300">
              DW FINANCE AI
            </p>

            <h1 className="mt-3 text-2xl font-bold">{page.title}</h1>

            <p className="mt-3 leading-7 text-slate-400">
              {page.description}
            </p>

            <div className="mt-6 rounded-xl border border-dashed border-white/15 p-4 text-sm text-slate-500">
              Área preparada para a próxima etapa de desenvolvimento.
            </div>

            <Link
              href="/dashboard"
              className="mt-6 inline-flex rounded-xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              Voltar ao dashboard
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
