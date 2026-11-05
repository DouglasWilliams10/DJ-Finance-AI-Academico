import { requireAuth } from "@/lib/auth-guard";
import SectionCard from "@/components/ui/SectionCard";

export const instant = false;

export default async function AIAssistantPage() {
  await requireAuth();
  return (
    <SectionCard
      title="Assistente IA"
      description="Assistente inteligente para apoiar sua organização financeira."
    >
      <p className="text-sm text-slate-400">
        O assistente de IA será implementado em uma etapa futura.
      </p>
    </SectionCard>
  );
}
