"use client";

import type { Category } from "@/lib/types";
import { CloseIcon, SearchIcon } from "@/components/icons";
import { SidebarCategory } from "./SidebarCategory";
import { SidebarCategorySkeleton } from "./Skeleton";

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
    <aside className="flex w-full shrink-0 flex-col gap-5 lg:w-100">
      <div className="relative flex h-14 items-center rounded-lg border border-white/10 bg-card px-4">
        <SearchIcon className="h-4.5 w-4.5 shrink-0 text-text" />
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Ara.."
          className="ml-3 w-full bg-transparent text-[15px] text-text placeholder:text-text-muted focus:outline-none"
          aria-label="Makalelerde ara"
        />
        {query && (
          <button
            type="button"
            onClick={() => onQueryChange("")}
            className="ml-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-text-muted transition-colors hover:bg-white/20 hover:text-text"
            aria-label="Aramayı temizle"
          >
            <CloseIcon className="h-2.5 w-2.5" />
          </button>
        )}
      </div>

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
