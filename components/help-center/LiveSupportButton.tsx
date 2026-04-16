"use client";

import { motion } from "framer-motion";
import { SupportIcon } from "@/components/icons";

export function LiveSupportButton() {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="inline-flex w-full max-w-[260px] items-center justify-between gap-3 rounded-lg bg-primary p-4 text-[16px] font-medium text-white shadow-[0_12px_40px_-12px_rgba(1,98,255,0.6)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
      aria-label="Canlı Desteğe Bağlan"
    >
      <SupportIcon className="h-6 w-6" />
      <span>Canlı Desteğe Bağlan</span>
    </motion.button>
  );
}
