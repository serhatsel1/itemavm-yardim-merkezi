"use client";

import { motion } from "framer-motion";
import { ArrowLeftIcon } from "@/components/icons";

export function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ x: -2 }}
      className="inline-flex h-[42px] w-fit items-center gap-1.5 rounded-lg border border-white/10 bg-border-soft px-4 text-[14px] font-semibold leading-[1.193] text-text focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      <ArrowLeftIcon className="h-[18px] w-[18px]" />
      Geri Dön
    </motion.button>
  );
}
