"use client";

import { useState } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { DislikeIcon, LikeIcon } from "@/components/icons";

type Choice = "yes" | "no" | null;

export function FeedbackBox({
  articleSlug,
  baseYes,
  baseNo,
}: {
  articleSlug: string;
  baseYes: number;
  baseNo: number;
}) {
  const [choice, setChoice] = useState<Choice>(null);

  const toggle = (next: Exclude<Choice, null>) =>
    setChoice((prev) => (prev === next ? null : next));

  const yesCount = baseYes + (choice === "yes" ? 1 : 0);
  const noCount = baseNo + (choice === "no" ? 1 : 0);

  return (
    <div
      key={articleSlug}
      className="flex w-full flex-col items-center gap-6 rounded-lg border border-white/5 bg-card-alt py-6 text-center lg:max-w-248.5"
    >
      <div className="flex max-w-67.5 flex-col items-center gap-4 lg:max-w-none">
        <h3 className="text-[18px] font-semibold leading-[2.222] text-text lg:max-w-194.75">
          Bu İçeriği Faydalı Buldunuz mu?
        </h3>
        <p className="text-[14px] font-medium leading-[1.714] text-text-muted lg:max-w-133.5 lg:text-[15px] lg:leading-[1.6]">
          Geri bildiriminiz, Yardım Merkezi içeriklerini sizin için daha iyi
          hale getirmemize yardımcı olur.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2.5">
        <motion.button
          type="button"
          whileTap={{ scale: 0.96 }}
          onClick={() => toggle("yes")}
          aria-pressed={choice === "yes"}
          className={clsx(
            "inline-flex h-[45px] min-w-[130px] items-center justify-center gap-2.5 rounded-lg border px-4 text-[14px] font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40",
            choice === "yes"
              ? "border-success bg-success/10 text-success"
              : "border-success/60 bg-card text-success hover:bg-success/5"
          )}
        >
          <LikeIcon className="h-[18px] w-[18px]" />
          Evet ({yesCount})
        </motion.button>
        <motion.button
          type="button"
          whileTap={{ scale: 0.96 }}
          onClick={() => toggle("no")}
          aria-pressed={choice === "no"}
          className={clsx(
            "inline-flex h-[45px] min-w-[130px] items-center justify-center gap-2.5 rounded-lg border px-4 text-[14px] font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40",
            choice === "no"
              ? "border-danger bg-danger/10 text-danger"
              : "border-danger/60 bg-card text-danger hover:bg-danger/5"
          )}
        >
          <DislikeIcon className="h-[18px] w-[18px]" />
          Hayır ({noCount})
        </motion.button>
      </div>
    </div>
  );
}
