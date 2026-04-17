"use client";

import { type ReactNode, useState } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { DislikeIcon, LikeIcon } from "@/components/icons";

type Choice = "yes" | "no" | null;

const FEEDBACK_BTN_BASE =
  "inline-flex h-[45px] min-w-[130px] items-center justify-center gap-2.5 rounded-lg border px-4 text-[14px] font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40";

function FeedbackButton({
  pressed,
  onClick,
  variant,
  icon,
  children,
}: {
  pressed: boolean;
  onClick: () => void;
  variant: "success" | "danger";
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      aria-pressed={pressed}
      className={clsx(
        FEEDBACK_BTN_BASE,
        pressed
          ? `border-${variant} bg-${variant}/10 text-${variant}`
          : `border-${variant} bg-card text-${variant} hover:bg-${variant}/5`
      )}
    >
      {icon}
      {children}
    </motion.button>
  );
}

export function FeedbackBox({
  initialYesCount,
  initialNoCount,
}: {
  initialYesCount: number;
  initialNoCount: number;
}) {
  const [choice, setChoice] = useState<Choice>(null);

  const toggle = (next: Exclude<Choice, null>) =>
    setChoice((prev) => (prev === next ? null : next));

  const yesCount = initialYesCount + (choice === "yes" ? 1 : 0);
  const noCount = initialNoCount + (choice === "no" ? 1 : 0);

  return (
    <div className="flex w-full flex-col items-center gap-6 rounded-lg border border-white/5 bg-card-alt py-6 text-center lg:max-w-248.5 lg:py-5">
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
        <FeedbackButton
          pressed={choice === "yes"}
          onClick={() => toggle("yes")}
          variant="success"
          icon={<LikeIcon className="h-4.5 w-4.5" />}
        >
          Evet ({yesCount})
        </FeedbackButton>
        <FeedbackButton
          pressed={choice === "no"}
          onClick={() => toggle("no")}
          variant="danger"
          icon={<DislikeIcon className="h-4.5 w-4.5" />}
        >
          Hayır ({noCount})
        </FeedbackButton>
      </div>
    </div>
  );
}
