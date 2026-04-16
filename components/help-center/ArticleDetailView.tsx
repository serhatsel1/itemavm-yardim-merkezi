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
      className="flex w-full flex-col gap-7.5 lg:gap-10"
    >
      <BackButton onClick={onBack} />

      <article className="flex w-full flex-col gap-7.5 rounded-xl border border-white/5 bg-card-alt p-4 lg:max-w-248.5 lg:gap-10 lg:px-5 lg:py-7.5">
        <h1 className="text-[18px] font-semibold leading-[1.333] text-text lg:max-w-125 lg:text-[22px] lg:leading-[1.091]">
          {article.title}
        </h1>

        <div className="flex flex-col gap-5">
          {article.content.map((block, index) => {
            if (block.type === "heading") {
              return (
                <h2
                  key={index}
                  className="text-[18px] font-semibold leading-[1.333] text-text lg:text-[22px] lg:leading-[1.091]"
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
              <figure key={index} className="overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={block.src} alt={block.alt} className="w-full" />
              </figure>
            );
          })}
        </div>
      </article>

      <FeedbackBox
        baseYes={Math.max(1, Math.round(article.likes / 50))}
        baseNo={Math.max(0, Math.round(article.dislikes / 10))}
      />
    </motion.div>
  );
}
