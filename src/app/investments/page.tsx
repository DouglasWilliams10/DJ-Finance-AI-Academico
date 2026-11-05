import { requireAuth } from "@/lib/auth-guard";
import SectionCard from "@/components/ui/SectionCard";

export const instant = false;

export default async function InvestmentsPage() {
  await requireAuth();

  return (
    <SectionCard
      title="Investimentos"
      description="Acompanhe seus investimentos financeiros."
    >
      <p className="text-sm text-slate-400">
        O módulo de investimentos será implementado nas próximas etapas.
      </p>
    </SectionCard>
  );
}
