"use client";

import { motion } from "framer-motion";
import type { Article } from "@/lib/types";
import { BackButton } from "./BackButton";
import { ContentBlock } from "./ContentBlock";
import { FeedbackBox } from "./FeedbackBox";

const ARTICLE_TITLE_CLASS =
  "text-[18px] font-semibold leading-[1.333] text-text md:max-w-125 md:text-[22px] md:leading-[1.091]";

export function ArticleDetailView({
  article,
  onBack,
}: {
  article: Article;
  onBack: () => void;
}) {
  return (
    <motion.div
      key={article.slug}
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -12 }}
      transition={{ duration: 0.25 }}
      className="flex w-full flex-col gap-7.5 md:gap-10"
    >
      <BackButton onClick={onBack} />

      <article className="flex w-full flex-col gap-7.5 rounded-xl border border-white/5 bg-card-alt p-4 md:max-w-248.5 md:gap-10 md:px-5 md:py-7.5">
        <h1 className={ARTICLE_TITLE_CLASS}>{article.title}</h1>

        <div className="flex flex-col gap-5">
          {article.content.map((block, index) => (
            <ContentBlock key={index} block={block} />
          ))}
        </div>
      </article>

      <FeedbackBox
        initialYesCount={Math.max(1, Math.round(article.likes / 50))}
        initialNoCount={Math.max(0, Math.round(article.dislikes / 10))}
      />
    </motion.div>
  );
}
