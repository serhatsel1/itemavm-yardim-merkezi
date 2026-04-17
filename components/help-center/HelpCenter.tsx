"use client";

import clsx from "clsx";
import { AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Article, HelpCenterData } from "@/lib/types";
import { useHashRoute } from "@/lib/hooks/useHashRoute";
import { useArticleSearch } from "@/lib/hooks/useArticleSearch";
import { useDebouncedValue } from "@/lib/hooks/useDebouncedValue";
import { useExpandedCategories } from "@/lib/hooks/useExpandedCategories";
import { useScrollReveal } from "@/lib/hooks/useScrollReveal";
import { ChevronDownIcon, GridIcon } from "@/components/icons";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { SearchInput } from "./SearchInput";
import { HomeView } from "./HomeView";
import { ArticleDetailView } from "./ArticleDetailView";
import { MobileCategoryDrawer } from "./MobileCategoryDrawer";

function findArticle(
  categories: HelpCenterData["categories"],
  slug: string | null
) {
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
  const contentPanelRef = useRef<HTMLDivElement>(null);
  const mobileHeaderRef = useRef<HTMLDivElement>(null);
  const headerHidden = useScrollReveal(mobileHeaderRef);

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

  useEffect(() => {
    if (activeSlug && !match) setActiveSlug(null);
  }, [activeSlug, match, setActiveSlug]);

  useEffect(() => {
    document.title = activeArticle
      ? `${activeArticle.title} — itemAVM Yardım Merkezi`
      : "itemAVM Yardım Merkezi";
  }, [activeArticle]);

  const { expandedIds, toggleCategory } = useExpandedCategories(
    filteredCategories,
    isFiltered,
    match?.category.id
  );

  const scrollToContent = useCallback(() => {
    requestAnimationFrame(() => {
      if (contentPanelRef.current) {
        contentPanelRef.current.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  }, []);

  const handleSelectArticle = useCallback(
    (slug: string) => {
      setQuery("");
      setActiveSlug(slug);
      scrollToContent();
    },
    [setActiveSlug, scrollToContent]
  );

  const handleBackHome = useCallback(() => {
    setActiveSlug(null);
    scrollToContent();
  }, [setActiveSlug, scrollToContent]);

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
          helpCenterData={data}
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
      <div className="min-h-screen bg-bg md:hidden">
        <div
          ref={mobileHeaderRef}
          className={clsx(
            "sticky top-0 z-30 flex flex-col gap-4 bg-bg px-4 pb-4 pt-4.75 transition-transform duration-300",
            headerHidden ? "-translate-y-full" : "translate-y-0"
          )}
        >
          <SearchInput value={query} onChange={setQuery} className="bg-panel" />

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="flex items-center justify-between rounded-lg border border-white/5 bg-panel p-4"
          >
            <span className="flex items-center gap-2.5">
              <GridIcon className="h-6 w-6 text-text" />
              <span className="text-[16px] font-semibold leading-normal tracking-[-0.006em] text-text">
                Kategoriler
              </span>
            </span>
            <span className="flex h-7.5 w-7.5 items-center justify-center rounded-lg bg-white/10">
              <ChevronDownIcon className="h-4.5 w-4.5 rotate-180 text-text-muted" />
            </span>
          </button>
        </div>

        <div className="flex flex-col gap-5 px-4 pb-6">
          <div ref={contentPanelRef}>
            <div className="rounded-t-lg border-b border-border-soft bg-panel px-6 py-5">
              <h2 className="text-[16px] font-bold leading-[1.3] text-text">
                Yardım Merkezi
              </h2>
            </div>
            <div className="rounded-b-lg bg-panel p-4">{content}</div>
          </div>
        </div>
      </div>

      {/* ── Tablet + Desktop ── */}
      <div className="hidden min-h-screen bg-bg px-6 py-13 md:flex md:items-start md:justify-center">
        <div className="w-full max-w-373.5 overflow-hidden rounded-lg bg-panel">
          <Header />
          <div className="flex items-stretch gap-5 p-5">
            <Sidebar
              categories={filteredCategories}
              query={query}
              onQueryChange={setQuery}
              expandedIds={expandedIds}
              onToggleCategory={toggleCategory}
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
      </div>

      <MobileCategoryDrawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        categories={categories}
        expandedIds={expandedIds}
        onToggleCategory={toggleCategory}
        activeSlug={activeSlug}
        onSelectArticle={handleSelectArticle}
      />
    </div>
  );
}
