import { requireAuth } from "@/lib/auth-guard";
import SectionCard from "@/components/ui/SectionCard";

export const instant = false;

export default async function ReportsPage() {
  await requireAuth();
  return (
    <SectionCard
      title="Relatórios"
      description="Visualize relatórios da sua vida financeira."
    >
      <p className="text-sm text-slate-400">
        Os relatórios financeiros serão implementados nas próximas etapas.
      </p>
    </SectionCard>
  );
}
