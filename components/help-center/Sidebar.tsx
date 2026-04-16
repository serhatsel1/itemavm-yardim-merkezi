"use client";

import type { Category } from "@/lib/types";
import { SearchIcon } from "@/components/icons";
import { SidebarCategory } from "./SidebarCategory";

export function Sidebar({
  categories,
  query,
  onQueryChange,
  expandedIds,
  onToggleCategory,
  activeSlug,
  onSelectArticle,
}: {
  categories: Category[];
  query: string;
  onQueryChange: (value: string) => void;
  expandedIds: Set<string>;
  onToggleCategory: (id: string) => void;
  activeSlug: string | null;
  onSelectArticle: (slug: string) => void;
}) {
  return (
    <aside className="flex w-full shrink-0 flex-col gap-5 lg:w-[400px]">
      <label className="relative flex h-14 items-center rounded-lg border border-white/10 bg-card px-4">
        <SearchIcon className="h-[18px] w-[18px] text-text" />
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Ara.."
          className="ml-3 w-full bg-transparent text-[15px] text-text placeholder:text-text-muted focus:outline-none"
          aria-label="Makalelerde ara"
        />
      </label>

      <div className="flex flex-col gap-4 lg:max-h-[calc(100vh-200px)] lg:overflow-y-auto lg:scrollbar-thin">
        {categories.length === 0 ? (
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
