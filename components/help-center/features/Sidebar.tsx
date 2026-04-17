"use client";

import type { Category } from "@/lib/types";
import { SidebarCategory } from "./SidebarCategory";
import { SidebarCategorySkeleton } from "../ui/Skeleton";
import { SearchInput } from "./SearchInput";

export function Sidebar({
  categories,
  query,
  onQueryChange,
  expandedIds,
  onToggleCategory,
  activeSlug,
  onSelectArticle,
  isSearching = false,
}: {
  categories: Category[];
  query: string;
  onQueryChange: (value: string) => void;
  expandedIds: Set<string>;
  onToggleCategory: (id: string) => void;
  activeSlug: string | null;
  onSelectArticle: (slug: string) => void;
  isSearching?: boolean;
}) {
  return (
    <aside className="flex w-full shrink-0 flex-col gap-5 md:w-60 lg:w-100">
      <SearchInput value={query} onChange={onQueryChange} />

      <div className="flex flex-col gap-4">
        {isSearching ? (
          Array.from({ length: 4 }).map((_, i) => (
            <SidebarCategorySkeleton key={i} />
          ))
        ) : categories.length === 0 ? (
          <p className="rounded-lg border border-white/5 bg-card p-4 text-[14px] text-text-muted">
            Sonuç bulunamadı.
          </p>
        ) : (
          categories.map((category) => (
            <SidebarCategory
              key={category.id}
              category={category}
              expanded={expandedIds.has(category.id)}
              activeSlug={activeSlug}
              onToggle={onToggleCategory}
              onSelect={onSelectArticle}
            />
          ))
        )}
      </div>
    </aside>
  );
}
