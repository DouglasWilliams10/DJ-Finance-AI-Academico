
import type { ReactNode } from "react";

interface SectionCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export default function SectionCard({
  title,
  description,
  children,
  className = "",
}: SectionCardProps) {
  return (
    <section
      className={`rounded-2xl border border-white/10 bg-[#101B2B] p-5 sm:p-6 ${className}`}
    >
      <div className="mb-5">
        <h2 className="font-semibold text-white">{title}</h2>

        {description && (
          <p className="mt-1 text-sm text-slate-400">{description}</p>
        )}
      </div>

      {children}
    </section>
  );
}
