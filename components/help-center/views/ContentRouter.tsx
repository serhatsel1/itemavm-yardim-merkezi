"use client";

import { AnimatePresence } from "framer-motion";
import type { Article, Category, HelpCenterData } from "@/lib/types";
import { ArticleDetailView } from "./ArticleDetailView";
import { HomeView } from "./HomeView";

export function ContentRouter({
  activeArticle,
  onBack,
  categories,
  helpCenterData,
  query,
  onOpenArticle,
  isFiltered,
  isSearching,
}: {
  activeArticle: Article | null;
  onBack: () => void;
  categories: Category[];
  helpCenterData: HelpCenterData;
  query: string;
  onOpenArticle: (slug: string) => void;
  isFiltered: boolean;
  isSearching: boolean;
}) {
  return (
    <AnimatePresence mode="wait">
      {activeArticle ? (
        <ArticleDetailView
          key={`detail-${activeArticle.slug}`}
          article={activeArticle}
          onBack={onBack}
        />
      ) : (
        <HomeView
          key="home"
          categories={categories}
          helpCenterData={helpCenterData}
          query={query}
          onOpenArticle={onOpenArticle}
          isFiltered={isFiltered}
          isSearching={isSearching}
        />
      )}
    </AnimatePresence>
  );
}
