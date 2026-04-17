"use client";

import { motion } from "framer-motion";
import type { Category, HelpCenterData } from "@/lib/types";
import { HeroQuestionIllustration } from "@/components/icons";
import { ArticleCard } from "../ui/ArticleCard";
import { LiveSupportButton } from "../ui/LiveSupportButton";
import { CARD_GRID_CLASS, CardGridSkeleton } from "../ui/Skeleton";
import { EmptySearchState } from "../ui/EmptySearchState";

export function HomeView({
  categories,
  helpCenterData,
  query,
  onOpenArticle,
  isFiltered,
  isSearching,
}: {
  categories: Category[];
  helpCenterData: HelpCenterData;
  query: string;
  onOpenArticle: (slug: string) => void;
  isFiltered: boolean;
  isSearching: boolean;
}) {
  const articles = categories.flatMap((c) => c.articles);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
      className="flex w-full flex-1 flex-col items-center gap-7.5 py-7.5 md:gap-7.5 md:py-10"
    >
      {!isFiltered && !isSearching && (
        <div className="flex flex-col items-center gap-7.5 md:gap-10">
          <div className="flex flex-col items-center gap-5 md:gap-10">
            <HeroQuestionIllustration className="h-15 w-15 md:h-17.5 md:w-17.5" />
            <div className="flex flex-col items-center gap-6 text-center md:max-w-195">
              <h1 className="text-[22px] font-semibold leading-[1.818] text-text md:text-[30px] md:leading-[1.333] md:tracking-[-0.006em]">
                Yardım Merkezine Hoş Geldiniz
              </h1>
              <p className="text-[14px] font-medium leading-[1.714] text-text-muted md:text-[15px] md:leading-[1.6]">
                Sık sorulan sorulara göz atabilir, işlemlerinizle ilgili hızlıca
                destek alabilir ve aradığınız yanıta kolayca ulaşabilirsiniz.
              </p>
            </div>
          </div>
          <LiveSupportButton />
        </div>
      )}

      {isSearching ? (
        <CardGridSkeleton count={6} />
      ) : articles.length === 0 && isFiltered ? (
        <EmptySearchState
          query={query}
          helpCenterData={helpCenterData}
          onOpenArticle={onOpenArticle}
        />
      ) : (
        <div className={CARD_GRID_CLASS}>
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onOpen={onOpenArticle}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
