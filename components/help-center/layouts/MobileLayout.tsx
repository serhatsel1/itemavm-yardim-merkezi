import type { ReactNode } from "react";
import { Header } from "../ui/Header";
import { MobileHeader } from "./MobileHeader";

export function MobileLayout({
  query,
  onQueryChange,
  onOpenDrawer,
  children,
}: {
  query: string;
  onQueryChange: (value: string) => void;
  onOpenDrawer: () => void;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-bg md:hidden">
      <MobileHeader
        query={query}
        onQueryChange={onQueryChange}
        onOpenDrawer={onOpenDrawer}
      />

      <div className="flex flex-col gap-5 px-4 pb-6">
        <div>
          <Header className="bg-panel" />
          <div className="rounded-b-lg bg-panel p-4">{children}</div>
        </div>
      </div>
    </div>
  );
}
