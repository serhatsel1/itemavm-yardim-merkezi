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
  const articles = categories.flatMap((c) =>
    c.articles.map((a) => ({ article: a, icon: c.icon }))
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="flex w-full flex-1 flex-col items-center gap-[30px] py-6 lg:py-10"
    >
      {!isFiltered && (
        <div className="flex flex-col items-center gap-10">
          <HeroQuestionIllustration className="h-[70px] w-[70px]" />
          <div className="flex max-w-[780px] flex-col items-center gap-6 text-center">
            <h1 className="text-[clamp(24px,3vw,30px)] font-semibold leading-[1.333] tracking-[-0.006em] text-text">
              Yardım Merkezine Hoş Geldiniz
            </h1>
            <p className="text-[15px] font-medium leading-[1.6] text-text-muted">
              Sık sorulan sorulara göz atabilir, işlemlerinizle ilgili hızlıca
              destek alabilir ve aradığınız yanıta kolayca ulaşabilirsiniz.
            </p>
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
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-3.75 xl:grid-cols-3 xl:gap-6">
          {articles.map(({ article, icon }) => (
            <ArticleCard
              key={article.id}
              article={article}
              icon={icon}
              onOpen={onOpenArticle}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
