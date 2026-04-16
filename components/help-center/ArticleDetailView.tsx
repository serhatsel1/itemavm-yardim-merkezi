"use client";

import { motion } from "framer-motion";
import type { Article } from "@/lib/types";
import { BackButton } from "./BackButton";
import { FeedbackBox } from "./FeedbackBox";

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
      className="flex w-full flex-col gap-10"
    >
      <BackButton onClick={onBack} />

      <article className="flex w-full max-w-[994px] flex-col gap-10 rounded-xl border border-white/5 bg-card-alt px-5 py-[30px] sm:px-5">
        <h1 className="max-w-[500px] text-[22px] font-semibold leading-[1.091] text-text">
          {article.title}
        </h1>

        <div className="flex flex-col gap-5">
          {article.content.map((block, index) => {
            if (block.type === "heading") {
              return (
                <h2
                  key={index}
                  className="text-[22px] font-semibold leading-[1.091] text-text"
                >
                  {block.text}
                </h2>
              );
            }
            if (block.type === "paragraph") {
              return (
                <p
                  key={index}
                  className="text-[14px] font-medium leading-[1.714] text-text-muted"
                >
                  {block.text}
                </p>
              );
            }
            return (
              <figure
                key={index}
                className="overflow-hidden rounded-lg border border-white/5 bg-card"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={block.src} alt={block.alt} className="w-full" />
              </figure>
            );
          })}
        </div>
      </article>

      <FeedbackBox
        articleSlug={article.slug}
        baseYes={Math.max(1, Math.round(article.likes / 50))}
        baseNo={Math.max(0, Math.round(article.dislikes / 10))}
      />
    </motion.div>
  );
}
