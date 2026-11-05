import type { ReactNode } from "react";
import { requireAuth } from "@/lib/auth-guard";

export const instant = false;

export default async function SettingsLayout({
  children,
}: {
  children: ReactNode;
}) {
  await requireAuth();

  return children;
}