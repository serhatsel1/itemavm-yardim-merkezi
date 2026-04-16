"use client";

import { useMemo } from "react";
import type { Article, Category } from "@/lib/types";

export interface ArticleSearchResult {
  filteredCategories: Category[];
  flatArticles: Article[];
  isFiltered: boolean;
}

const normalize = (value: string) =>
  value
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

export function useArticleSearch(
  categories: Category[],
  query: string
): ArticleSearchResult {
  return useMemo(() => {
    const trimmed = query.trim();
    const isFiltered = trimmed.length > 0;

    if (!isFiltered) {
      const flat = categories.flatMap((c) => c.articles);
      return { filteredCategories: categories, flatArticles: flat, isFiltered };
    }

    const needle = normalize(trimmed);
    const filteredCategories: Category[] = categories
      .map((category) => {
        const matches = category.articles.filter(
          (article) =>
            normalize(article.title).includes(needle) ||
            normalize(article.summary).includes(needle)
        );
        return matches.length > 0
          ? { ...category, articles: matches }
          : null;
      })
      .filter((c): c is Category => c !== null);

    const flatArticles = filteredCategories.flatMap((c) => c.articles);
    return { filteredCategories, flatArticles, isFiltered };
  }, [categories, query]);
}
