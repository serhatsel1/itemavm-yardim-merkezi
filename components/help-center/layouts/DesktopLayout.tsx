import type { ReactNode } from "react";
import type { Category } from "@/lib/types";
import { Header } from "../ui/Header";
import { Sidebar } from "../features/Sidebar";

export function DesktopLayout({
  categories,
  query,
  onQueryChange,
  expandedIds,
  onToggleCategory,
  activeSlug,
  onSelectArticle,
  isSearching,
  children,
}: {
  categories: Category[];
  query: string;
  onQueryChange: (value: string) => void;
  expandedIds: Set<string>;
  onToggleCategory: (id: string) => void;
  activeSlug: string | null;
  onSelectArticle: (slug: string) => void;
  isSearching: boolean;
  children: ReactNode;
}) {
  return (
    <div className="hidden min-h-screen bg-bg px-6 py-13 md:flex md:items-start md:justify-center">
      <div className="w-full max-w-373.5 overflow-hidden rounded-lg bg-panel">
        <Header />
        <div className="flex items-stretch gap-5 p-5">
          <Sidebar
            categories={categories}
            query={query}
            onQueryChange={onQueryChange}
            expandedIds={expandedIds}
            onToggleCategory={onToggleCategory}
            activeSlug={activeSlug}
            onSelectArticle={onSelectArticle}
            isSearching={isSearching}
          />
          <div className="w-0.5 shrink-0 rounded-[63px] bg-border-soft" />
          <main className="flex min-w-0 flex-1 justify-center">{children}</main>
        </div>
      </div>
    </div>
  );
}
