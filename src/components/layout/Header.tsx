
"use client";

import {
  Bell,
  ChevronDown,
  LogOut,
  Palette,
  Search,
  UserRound,
} from "lucide-react";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const titles: Record<string, string> = {
  dashboard: "Visão geral",
  transacoes: "Transações",
  cofres: "Meus cofres",
  investimentos: "Investimentos",
  relatorios: "Relatórios financeiros",
  "assistente-ia": "Assistente IA",
  settings: "Configurações",
};

export default function Header() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  const section = pathname.split("/")[1];
  const title = titles[section] ?? "DJ Finance AI";

  const name = session?.user?.name?.trim() || "";
  const image = session?.user?.image ?? null;

  const nameParts = name
    .split(/\s+/)
    .filter(Boolean);

  const initial =
    nameParts.length >= 2
      ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toLocaleUpperCase("pt-BR")
      : nameParts[0]?.slice(0, 2).toLocaleUpperCase("pt-BR") || "U";

  const [imageError, setImageError] = useState<string | null>(null);

  const showImage = Boolean(image) && imageError !== image;

  return (
    <header className="relative z-30 flex min-h-[88px] flex-wrap items-center justify-between gap-4 border-b border-white/10 bg-[#0B1220]/80 px-5 py-4 sm:px-8">
      <div>
        <p className="text-xs text-slate-500">
          DJ Finance AI / Painel
        </p>
        <h2 className="mt-1 text-xl font-semibold text-white">
          {title}
        </h2>
      </div>

      <div className="flex items-center gap-3">
        <label className="hidden items-center gap-2 rounded-xl border border-white/10 bg-[#101B2B] px-3 py-2.5 md:flex">
          <Search size={17} className="text-slate-500" />
          <input
            type="search"
            placeholder="Buscar..."
            aria-label="Buscar"
            className="w-36 bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
          />
        </label>

        <button
          type="button"
          aria-label="Notificações"
          className="rounded-xl border border-white/10 bg-[#101B2B] p-3 text-slate-300 transition hover:text-cyan-300"
        >
          <Bell size={19} />
        </button>

        <div className="relative">
          <button
            type="button"
            aria-label="Abrir menu do perfil"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-[#101B2B] p-1.5 pr-2 transition hover:border-cyan-400/50"
          >
            {showImage && image ? (
              <Image
                src={image}
                alt={name ? `Foto de ${name}` : "Foto do perfil"}
                width={36}
                height={36}
                unoptimized
                onError={() => setImageError(image)}
                className="h-9 w-9 rounded-full object-cover"
              />
            ) : (
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-400/15 font-semibold text-cyan-300">
                {initial}
              </span>
            )}

            <ChevronDown
              size={16}
              className="text-slate-400"
            />
          </button>

          {menuOpen && (
            <>
              <button
                type="button"
                aria-label="Fechar menu"
                className="fixed inset-0 z-40 cursor-default"
                onClick={() => setMenuOpen(false)}
              />

              <div className="absolute right-0 top-full z-50 mt-3 w-64 rounded-2xl border border-white/10 bg-[#101B2B] p-2 shadow-2xl">
                <div className="border-b border-white/10 px-3 py-3">
                  <p className="truncate text-sm font-semibold text-white">
                    {name}
                  </p>
                  <p className="truncate text-xs text-slate-400">
                    {session?.user?.email ?? ""}
                  </p>
                </div>

                <Link
                  href="/settings?tab=profile"
                  onClick={() => setMenuOpen(false)}
                  className="mt-2 flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-200 transition hover:bg-white/5 hover:text-cyan-300"
                >
                  <UserRound size={18} />
                  Perfil e preferências
                </Link>

                <Link
                  href="/settings?tab=appearance"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-200 transition hover:bg-white/5 hover:text-cyan-300"
                >
                  <Palette size={18} />
                  Aparência
                </Link>

                <button
                  type="button"
                  disabled={status === "loading"}
                  onClick={() =>
                    signOut({ redirectTo: "/login" })
                  }
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-red-300 transition hover:bg-red-400/10 disabled:opacity-50"
                >
                  <LogOut size={18} />
                  Sair da conta
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
