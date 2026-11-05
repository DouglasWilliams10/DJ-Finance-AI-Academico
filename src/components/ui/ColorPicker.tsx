
"use client";

const palette = [
  { name: "Ciano", value: "#22D3EE" },
  { name: "Verde", value: "#4ADE80" },
  { name: "Azul", value: "#60A5FA" },
  { name: "Violeta", value: "#A78BFA" },
  { name: "Rosa", value: "#FB7185" },
  { name: "Laranja", value: "#FB923C" },
  { name: "Amarelo", value: "#FACC15" },
  { name: "Branco", value: "#F8FAFC" },
];

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
}

export default function ColorPicker({
  label,
  value,
  onChange,
}: ColorPickerProps) {
  return (
    <fieldset>
      <legend className="mb-3 text-sm font-medium text-slate-200">
        {label}
      </legend>

      <div className="flex flex-wrap gap-3">
        {palette.map((color) => {
          const selected = value === color.value;

          return (
            <button
              key={color.value}
              type="button"
              title={color.name}
              aria-label={`Selecionar cor ${color.name}`}
              aria-pressed={selected}
              onClick={() => onChange(color.value)}
              className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition ${
                selected
                  ? "border-white ring-2 ring-cyan-400/50"
                  : "border-white/10 hover:scale-110"
              }`}
              style={{ backgroundColor: color.value }}
            >
              {selected && (
                <span className="text-sm font-bold text-slate-950">✓</span>
              )}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
