
"use client";

import { useEffect, useState } from "react";

import {
  DEFAULT_CATEGORY_COLORS,
  getStoredCategoryColors,
} from "@/lib/category-colors";

const categories = [
  { name: "Moradia", value: 650, percent: 62 },
  { name: "Alimentação", value: 420, percent: 42 },
  { name: "Transporte", value: 280, percent: 28 },
  { name: "Outros", value: 150, percent: 15 },
];

export default function ExpenseCategories() {
  const [colors, setColors] = useState<Record<string, string>>(
    DEFAULT_CATEGORY_COLORS,
  );

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setColors(getStoredCategoryColors());
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="space-y-5">
      {categories.map((category) => (
        <div key={category.name}>
          <div className="mb-2 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span
                className="h-3 w-3 rounded-full"
                style={{
                  backgroundColor:
                    colors[category.name] ??
                    DEFAULT_CATEGORY_COLORS[category.name] ??
                    "#60A5FA",
                }}
              />

              <span className="text-sm text-slate-300">
                {category.name}
              </span>
            </div>

            <span className="text-sm font-medium text-slate-200">
              {category.value.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
                maximumFractionDigits: 0,
              })}
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-white/5">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${category.percent}%`,
                backgroundColor:
                  colors[category.name] ??
                  DEFAULT_CATEGORY_COLORS[category.name] ??
                  "#60A5FA",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
