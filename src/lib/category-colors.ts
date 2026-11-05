
export const CATEGORY_COLORS_STORAGE_KEY =
  "dw-finance-category-colors";

export const DEFAULT_CATEGORY_COLORS: Record<string, string> = {
  Moradia: "#22D3EE",
  Alimentação: "#A78BFA",
  Transporte: "#FACC15",
  Lazer: "#FB7185",
  Saúde: "#4ADE80",
  Outros: "#60A5FA",
};

export type CategoryColors = Record<string, string>;

export function getStoredCategoryColors(): CategoryColors {
  const defaults = { ...DEFAULT_CATEGORY_COLORS };

  if (typeof window === "undefined") {
    return defaults;
  }

  try {
    const stored = window.localStorage.getItem(
      CATEGORY_COLORS_STORAGE_KEY,
    );

    if (!stored) {
      return defaults;
    }

    const parsed: unknown = JSON.parse(stored);

    if (
      !parsed ||
      typeof parsed !== "object" ||
      Array.isArray(parsed)
    ) {
      return defaults;
    }

    const saved = parsed as Record<string, unknown>;

    return Object.fromEntries(
      Object.entries(DEFAULT_CATEGORY_COLORS).map(
        ([category, fallback]) => {
          const candidate = saved[category];

          return [
            category,
            typeof candidate === "string" &&
            /^#[0-9a-fA-F]{6}$/.test(candidate)
              ? candidate
              : fallback,
          ];
        },
      ),
    );
  } catch {
    return defaults;
  }
}
