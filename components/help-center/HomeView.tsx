"use client";

import { motion } from "framer-motion";
import type { Category } from "@/lib/types";
import { HeroQuestionIllustration } from "@/components/icons";
import { ArticleCard } from "./ArticleCard";
import { LiveSupportButton } from "./LiveSupportButton";

export function HomeView({
  categories,
  onOpenArticle,
  isFiltered,
}: {
  categories: Category[];
  onOpenArticle: (slug: string) => void;
  isFiltered: boolean;
}) {
  const articles = categories.flatMap((c) => c.articles);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="flex w-full flex-1 flex-col items-center gap-7.5 py-7.5 lg:gap-7.5 lg:py-10"
    >
      {!isFiltered && (
        <div className="flex flex-col items-center gap-7.5 lg:gap-10">
          {/* Icon + text group (gap: 20px mobile) */}
          <div className="flex flex-col items-center gap-5 lg:gap-10">
            <HeroQuestionIllustration className="h-15 w-15 lg:h-17.5 lg:w-17.5" />
            {/* Text block (gap: 24px) */}
            <div className="flex flex-col items-center gap-6 text-center lg:max-w-195">
              <h1 className="text-[22px] font-semibold leading-[1.818] text-text lg:text-[30px] lg:leading-[1.333] lg:tracking-[-0.006em]">
                Yardım Merkezine Hoş Geldiniz
              </h1>
              <p className="text-[14px] font-medium leading-[1.714] text-text-muted lg:text-[15px] lg:leading-[1.6]">
                Sık sorulan sorulara göz atabilir, işlemlerinizle ilgili hızlıca
                destek alabilir ve aradığınız yanıta kolayca ulaşabilirsiniz.
              </p>
            </div>
          </div>
          <LiveSupportButton />
        </div>
      )}

      {isFiltered && (
        <p className="text-[14px] text-text-muted">
          {articles.length} sonuç bulundu
        </p>
      )}

      {articles.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-10 text-center">
          <p className="text-[18px] font-semibold text-text">
            Sonuç bulunamadı
          </p>
          <p className="text-[14px] text-text-muted">
            Farklı bir anahtar kelime ile aramayı deneyin.
          </p>
        </div>
      ) : (
        <div className="grid w-full grid-cols-1 gap-3.75 sm:grid-cols-2 xl:grid-cols-3 xl:gap-6">
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
