"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { Article, HelpCenterData } from "@/lib/types";
import { useHashRoute } from "@/lib/hooks/useHashRoute";
import { useArticleSearch } from "@/lib/hooks/useArticleSearch";
import { useDebouncedValue } from "@/lib/hooks/useDebouncedValue";
import { useExpandedCategories } from "@/lib/hooks/useExpandedCategories";
import { DesktopLayout } from "./layouts/DesktopLayout";
import { MobileLayout } from "./layouts/MobileLayout";
import { ContentRouter } from "./views/ContentRouter";

const MobileCategoryDrawer = dynamic(
  () =>
    import("./features/MobileCategoryDrawer").then(
      (m) => m.MobileCategoryDrawer
    ),
  { ssr: false }
);

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
  const [query, setQueryRaw] = useState("");

  const setQuery = useCallback(
    (value: string) => {
      setQueryRaw(value);
      if (value && activeSlug) setActiveSlug(null);
    },
    [activeSlug, setActiveSlug]
  );

  const debouncedQuery = useDebouncedValue(query, 300);
  const [drawerOpen, setDrawerOpen] = useState(false);

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

  // Hash routing prevents generateMetadata usage — #hash is never sent
  // to the server. document.title via useEffect is the only viable
  // alternative for dynamic page titles with hash-based routing.
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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [activeSlug]);

  const handleSelectArticle = useCallback(
    (slug: string) => {
      setQuery("");
      setActiveSlug(slug);
    },
    [setActiveSlug, setQuery]
  );

  const handleBackHome = useCallback(() => {
    setActiveSlug(null);
  }, [setActiveSlug]);

  const contentRouter = (
    <ContentRouter
      activeArticle={activeArticle}
      onBack={handleBackHome}
      categories={filteredCategories}
      helpCenterData={data}
      query={debouncedQuery}
      onOpenArticle={handleSelectArticle}
      isFiltered={isFiltered}
      isSearching={isSearching}
    />
  );

  return (
    <div className="min-h-screen w-full">
      <MobileLayout
        query={query}
        onQueryChange={setQuery}
        onOpenDrawer={() => setDrawerOpen(true)}
      >
        {contentRouter}
      </MobileLayout>

      <DesktopLayout
        categories={filteredCategories}
        query={query}
        onQueryChange={setQuery}
        expandedIds={expandedIds}
        onToggleCategory={toggleCategory}
        activeSlug={activeSlug}
        onSelectArticle={handleSelectArticle}
        isSearching={isSearching}
      >
        {contentRouter}
      </DesktopLayout>

      <MobileCategoryDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        categories={categories}
        expandedIds={expandedIds}
        onToggleCategory={toggleCategory}
        activeSlug={activeSlug}
        onSelectArticle={handleSelectArticle}
      />
    </div>
  );
}
