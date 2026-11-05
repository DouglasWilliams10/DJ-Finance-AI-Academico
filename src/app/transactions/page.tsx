
import { requireAuth } from "@/lib/auth-guard";
import SectionCard from "@/components/ui/SectionCard";

export const instant = false;

export default async function TransactionsPage() {
  await requireAuth();

  return (
    <SectionCard
      title="Transações"
      description="Gerencie suas receitas e despesas."
    >
      <p className="text-sm text-slate-400">
        O módulo de transações será implementado nas próximas etapas.
      </p>
    </SectionCard>
  );
}
