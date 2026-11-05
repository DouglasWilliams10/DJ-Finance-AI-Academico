
"use client";

import { useEffect, useState } from "react";
import { Check, Palette, RotateCcw } from "lucide-react";

import {
  DEFAULT_CATEGORY_COLORS,
  CATEGORY_COLORS_STORAGE_KEY,
  getStoredCategoryColors,
} from "@/lib/category-colors";

import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import SectionCard from "@/components/ui/SectionCard";
import ColorPicker from "@/components/ui/ColorPicker";

export default function SettingsPage() {
  const [colors, setColors] = useState<Record<string, string>>(
    DEFAULT_CATEGORY_COLORS,
  );

  const [ready, setReady] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setColors(getStoredCategoryColors());
      setReady(true);
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  function updateColor(category: string, color: string) {
    setColors((current) => ({
      ...current,
      [category]: color,
    }));

    setSaved(false);
  }

  function savePreferences() {
    try {
      localStorage.setItem(
        CATEGORY_COLORS_STORAGE_KEY,
        JSON.stringify(colors),
      );

      setSaved(true);
    } catch {
      setSaved(false);
    }
  }

  function resetPreferences() {
    setColors({ ...DEFAULT_CATEGORY_COLORS });
    setSaved(false);

    try {
      localStorage.removeItem(CATEGORY_COLORS_STORAGE_KEY);
    } catch {
      // As cores padrão continuam disponíveis na tela.
    }
  }

  return (
    <div className="min-h-screen bg-[#080D18] text-slate-100 md:flex">
      <Sidebar />

      <main className="min-w-0 flex-1">
        <Header />

        <div className="mx-auto max-w-5xl space-y-6 p-5 sm:p-8">
          <div>
            <p className="text-sm text-cyan-300">
              PERSONALIZAÇÃO
            </p>

            <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
              Configurações visuais
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Personalize as cores das categorias para facilitar a leitura
              dos seus futuros gráficos financeiros.
            </p>
          </div>

          <SectionCard
            title="Cores das categorias"
            description="Escolha uma cor para identificar cada tipo de despesa."
          >
            <div className="space-y-7">
              {Object.entries(colors).map(([category, color]) => (
                <div
                  key={category}
                  className="grid gap-4 border-b border-white/5 pb-6 last:border-0 last:pb-0 sm:grid-cols-[160px_1fr]"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="h-4 w-4 rounded-full"
                      style={{ backgroundColor: color }}
                    />

                    <span className="text-sm text-slate-200">
                      {category}
                    </span>
                  </div>

                  <ColorPicker
                    label={`Cor de ${category}`}
                    value={color}
                    onChange={(nextColor) =>
                      updateColor(category, nextColor)
                    }
                  />
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard
            title="Prévia das categorias"
            description="Veja como as cores escolhidas ficarão identificadas."
          >
            <div className="flex flex-wrap gap-3">
              {Object.entries(colors).map(([category, color]) => (
                <div
                  key={category}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2"
                >
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: color }}
                  />

                  <span className="text-sm text-slate-300">
                    {category}
                  </span>
                </div>
              ))}
            </div>
          </SectionCard>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              disabled={!ready}
              onClick={savePreferences}
              className="inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:opacity-50"
            >
              <Check size={18} />
              Salvar preferências
            </button>

            <button
              type="button"
              onClick={resetPreferences}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm text-slate-300 transition hover:bg-white/5"
            >
              <RotateCcw size={17} />
              Restaurar padrão
            </button>
          </div>

          {saved && (
            <p role="status" className="text-sm text-emerald-400">
              <Check size={16} className="mr-2 inline" />
              Preferências salvas neste navegador.
            </p>
          )}

          <div className="rounded-xl border border-cyan-400/15 bg-cyan-400/5 p-4">
            <div className="flex items-start gap-3">
              <Palette
                className="mt-0.5 shrink-0 text-cyan-300"
                size={20}
              />

              <div>
                <h2 className="text-sm font-medium text-white">
                  Sobre suas preferências
                </h2>

                <p className="mt-1 text-sm leading-6 text-slate-400">
                  Nesta etapa, as cores ficam salvas somente no armazenamento
                  local deste navegador. Ainda não são compartilhadas entre
                  dispositivos nem vinculadas a uma conta no banco de dados.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
