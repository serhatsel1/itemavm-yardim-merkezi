"use client";

import { AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { Article, Category, HelpCenterData } from "@/lib/types";
import { useHashRoute } from "@/lib/hooks/useHashRoute";
import { useArticleSearch } from "@/lib/hooks/useArticleSearch";
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

  // Auto-expand category of active article
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

  // While searching, expand all filtered categories
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

  return (
    <div className="min-h-screen w-full bg-panel">
      <Header onOpenMobileSidebar={() => setMobileOpen(true)} />

      <div className="flex flex-col gap-5 p-4 sm:p-5 lg:flex-row lg:gap-5 lg:p-5">
        <div className="hidden lg:block">
          <Sidebar
            categories={filteredCategories}
            query={query}
            onQueryChange={setQuery}
            expandedIds={expandedIds}
            onToggleCategory={handleToggleCategory}
            activeSlug={activeSlug}
            onSelectArticle={handleSelectArticle}
          />
        </div>

        <div className="hidden w-0.5 shrink-0 self-stretch rounded-[63px] bg-border-soft lg:block" />

        {/* Mobile: search + trigger */}
        <div className="flex flex-col gap-3 lg:hidden">
          <Sidebar
            categories={[]}
            query={query}
            onQueryChange={setQuery}
            expandedIds={expandedIds}
            onToggleCategory={handleToggleCategory}
            activeSlug={activeSlug}
            onSelectArticle={handleSelectArticle}
          />
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-card px-4 py-3 text-[14px] font-medium text-text"
          >
            Kategorileri Görüntüle
          </button>
        </div>

        <main className="flex min-w-0 flex-1 justify-center">
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
        </main>
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
