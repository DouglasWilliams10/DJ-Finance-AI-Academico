
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowLeftRight,
  Bot,
  ChartNoAxesCombined,
  ChartPie,
  LayoutDashboard,
  Wallet,
  Vault,
} from "lucide-react";

const navigation = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Transações", href: "/transacoes", icon: ArrowLeftRight },
  { label: "Cofres", href: "/cofres", icon: Vault },
  {
    label: "Investimentos",
    href: "/investimentos",
    icon: ChartNoAxesCombined,
  },
  { label: "Relatórios", href: "/relatorios", icon: ChartPie },
  { label: "Assistente IA", href: "/assistente-ia", icon: Bot },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex min-h-screen w-64 shrink-0 flex-col border-r border-white/10 bg-[#0B1220] p-4">
      <Link href="/dashboard" className="mb-8 flex items-center gap-3 px-2">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400 text-slate-950">
          <Wallet size={24} strokeWidth={2.5} />
        </div>

        <div>
          <h1 className="text-lg font-bold tracking-tight text-white">
            DJ Finance
          </h1>
          <p className="text-xs tracking-widest text-cyan-400">AI</p>
        </div>
      </Link>

      <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
        Menu principal
      </p>

      <nav className="flex flex-1 flex-col gap-1">
        {navigation.map(({ label, href, icon: Icon }) => {
          const active =
            pathname === href || pathname.startsWith(`${href}/`);

          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${
                active
                  ? "border border-cyan-400/20 bg-cyan-400/10 font-medium text-cyan-300"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={19} />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-6 border-t border-white/10 pt-4">
        <div className="rounded-xl border border-white/10 bg-[#101B2B] p-3">
          <div className="flex items-center gap-2 text-sm font-medium text-white">
            <Bot size={18} className="text-cyan-400" />
            Seu financeiro, com IA
          </div>

          <p className="mt-2 text-xs leading-5 text-slate-400">
            Organize suas finanças e acompanhe sua evolução.
          </p>
        </div>
      </div>
    </aside>
  );
}
