"use client";

import { AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import type { Article, Category, HelpCenterData } from "@/lib/types";
import { useHashRoute } from "@/lib/hooks/useHashRoute";
import { useArticleSearch } from "@/lib/hooks/useArticleSearch";
import { useDebouncedValue } from "@/lib/hooks/useDebouncedValue";
import { ChevronDownIcon, CloseIcon, GridIcon, SearchIcon } from "@/components/icons";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { HomeView } from "./HomeView";
import { ArticleDetailView } from "./ArticleDetailView";
import { MobileCategoryDrawer } from "./MobileCategoryDrawer";

type ExpandAction =
  | { type: "toggle"; id: string }
  | { type: "sync"; auto: Set<string> };

function expandReducer(
  state: { auto: Set<string>; userToggled: Set<string> },
  action: ExpandAction
) {
  if (action.type === "toggle") {
    const next = new Set(state.userToggled);
    if (next.has(action.id)) next.delete(action.id);
    else next.add(action.id);
    return { ...state, userToggled: next };
  }
  // sync: auto changed, reset user toggles
  return { auto: action.auto, userToggled: new Set<string>() };
}

function findArticle(categories: Category[], slug: string | null) {
  if (!slug) return null;
  for (const category of categories) {
    const article = category.articles.find((a) => a.slug === slug);
    if (article) return { article, category };
  }
  return null;
}

export function HelpCenter({ data }: { data: HelpCenterData }) {
  const { categories } = data;
  const [activeSlug, setActiveSlug] = useHashRoute();
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query, 300);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { filteredCategories, isFiltered } = useArticleSearch(
    categories,
    debouncedQuery
  );

  const isSearching = query !== debouncedQuery;

  const match = useMemo(
    () => findArticle(categories, activeSlug),
    [categories, activeSlug]
  );
  const activeArticle: Article | null = match?.article ?? null;

  // Invalid hash → clear and fall back to home
  if (activeSlug && !activeArticle) {
    setActiveSlug(null);
  }

  const autoExpandedIds = useMemo(() => {
    if (isFiltered) return new Set(filteredCategories.map((c) => c.id));
    if (match?.category) return new Set([match.category.id]);
    return new Set<string>();
  }, [isFiltered, filteredCategories, match]);

  const [expandState, dispatchExpand] = useReducer(expandReducer, {
    auto: autoExpandedIds,
    userToggled: new Set<string>(),
  });

  if (expandState.auto !== autoExpandedIds) {
    dispatchExpand({ type: "sync", auto: autoExpandedIds });
  }

  const expandedIds = useMemo(() => {
    const merged = new Set(expandState.auto);
    expandState.userToggled.forEach((id) => {
      if (merged.has(id)) merged.delete(id);
      else merged.add(id);
    });
    return merged;
  }, [expandState]);

  useEffect(() => {
    document.title = activeArticle
      ? `${activeArticle.title} — itemAVM Yardım Merkezi`
      : "itemAVM Yardım Merkezi";
  }, [activeArticle]);

  const handleToggleCategory = useCallback(
    (id: string) => dispatchExpand({ type: "toggle", id }),
    []
  );

  const handleSelectArticle = useCallback(
    (slug: string) => {
      setQuery("");
      setActiveSlug(slug);
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [setActiveSlug]
  );

  const handleBackHome = useCallback(() => {
    setActiveSlug(null);
  }, [setActiveSlug]);

  /* ── Shared content ── */
  const content = (
    <AnimatePresence mode="wait">
      {activeArticle ? (
        <ArticleDetailView
          key={`detail-${activeArticle.slug}`}
          article={activeArticle}
          onBack={handleBackHome}
        />
      ) : (
        <HomeView
          key="home"
          categories={filteredCategories}
          allData={data}
          query={debouncedQuery}
          onOpenArticle={handleSelectArticle}
          isFiltered={isFiltered}
          isSearching={isSearching}
        />
      )}
    </AnimatePresence>
  );

  return (
    <div className="min-h-screen w-full">
      {/* ── Mobile ── */}
      <div className="min-h-screen bg-bg px-4 pb-6 pt-4.75 lg:hidden">
        <div className="flex flex-col gap-5">
          {/* Search bar */}
          <div className="relative flex h-14 items-center rounded-lg border border-white/10 bg-panel px-4">
            <SearchIcon className="h-4.5 w-4.5 shrink-0 text-white" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ara.."
              className="ml-3 w-full bg-transparent text-[15px] leading-[1.16] text-white placeholder:text-white focus:outline-none"
              aria-label="Makalelerde ara"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="ml-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-text-muted transition-colors hover:bg-white/20 hover:text-text"
                aria-label="Aramayı temizle"
              >
                <CloseIcon className="h-2.5 w-2.5" />
              </button>
            )}
          </div>

          {/* Kategoriler trigger */}
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="flex items-center justify-between rounded-lg border border-white/5 bg-panel p-4"
          >
            <span className="flex items-center gap-2.5">
              <GridIcon className="h-6 w-6 text-white" />
              <span className="text-[16px] font-semibold leading-normal tracking-[-0.006em] text-white">
                Kategoriler
              </span>
            </span>
            <span className="flex h-7.5 w-7.5 items-center justify-center rounded-lg bg-card">
              <ChevronDownIcon className="h-4.5 w-4.5 rotate-180 text-text-muted" />
            </span>
          </button>

          {/* Main panel: header + body */}
          <div>
            <div className="rounded-t-lg border-b border-border-soft bg-panel px-6 py-5">
              <h2 className="text-[16px] font-bold leading-[1.3] text-white">
                Yardım Merkezi
              </h2>
            </div>
            <div className="rounded-b-lg bg-panel p-4">
              {content}
            </div>
          </div>
        </div>
      </div>

      {/* ── Desktop ── */}
      <div className="hidden min-h-screen bg-panel lg:block">
        <Header />
        <div className="flex min-h-[calc(100vh-66px)] items-stretch gap-5 p-5">
          <Sidebar
            categories={filteredCategories}
            query={query}
            onQueryChange={setQuery}
            expandedIds={expandedIds}
            onToggleCategory={handleToggleCategory}
            activeSlug={activeSlug}
            onSelectArticle={handleSelectArticle}
            isSearching={isSearching}
          />
          <div className="w-0.5 shrink-0 rounded-[63px] bg-border-soft" />
          <main className="flex min-w-0 flex-1 justify-center">
            {content}
          </main>
        </div>
      </div>

      <MobileCategoryDrawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        categories={categories}
        expandedIds={expandedIds}
        onToggleCategory={handleToggleCategory}
        activeSlug={activeSlug}
        onSelectArticle={handleSelectArticle}
      />
    </div>
  );
}
