"use client";

import { AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { Article, Category, HelpCenterData } from "@/lib/types";
import { useHashRoute } from "@/lib/hooks/useHashRoute";
import { useArticleSearch } from "@/lib/hooks/useArticleSearch";
import { ChevronDownIcon, GridIcon, SearchIcon } from "@/components/icons";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { HomeView } from "./HomeView";
import { ArticleDetailView } from "./ArticleDetailView";
import { MobileCategoryDrawer } from "./MobileCategoryDrawer";

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
  const [mobileOpen, setMobileOpen] = useState(false);

  const { filteredCategories, isFiltered } = useArticleSearch(
    categories,
    query
  );

  const match = useMemo(
    () => findArticle(categories, activeSlug),
    [categories, activeSlug]
  );
  const activeArticle: Article | null = match?.article ?? null;

  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => new Set());

  useEffect(() => {
    if (match?.category) {
      setExpandedIds((prev) => {
        if (prev.has(match.category.id)) return prev;
        const next = new Set(prev);
        next.add(match.category.id);
        return next;
      });
    }
  }, [match]);

  useEffect(() => {
    if (isFiltered) {
      setExpandedIds(new Set(filteredCategories.map((c) => c.id)));
    }
  }, [isFiltered, filteredCategories]);

  const handleToggleCategory = useCallback((id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const handleSelectArticle = useCallback(
    (slug: string) => {
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
          onOpenArticle={handleSelectArticle}
          isFiltered={isFiltered}
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
          <label className="relative flex h-14 items-center rounded-lg border border-white/10 bg-panel px-4">
            <SearchIcon className="h-4.5 w-4.5 text-white" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ara.."
              className="ml-3 w-full bg-transparent text-[15px] leading-[1.16] text-white placeholder:text-white focus:outline-none"
              aria-label="Makalelerde ara"
            />
          </label>

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
        categories={filteredCategories}
        expandedIds={expandedIds}
        onToggleCategory={handleToggleCategory}
        activeSlug={activeSlug}
        onSelectArticle={handleSelectArticle}
      />
    </div>
  );
}
