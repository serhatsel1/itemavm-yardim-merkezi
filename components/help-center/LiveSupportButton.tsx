"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function LiveSupportButton() {
  return (
    <motion.button
      type="button"
      aria-disabled="true"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="inline-flex w-65 items-center justify-center rounded-lg bg-primary p-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
      aria-label="Canlı Desteğe Bağlan"
    >
      <span className="flex items-center gap-2.5">
        <Image
          src="/icons/support-icon.png"
          alt=""
          width={24}
          height={24}
          draggable={false}
        />
        <span className="text-[16px] font-medium leading-[1.193] text-text">
          Canlı Desteğe Bağlan
        </span>
      </span>
    </motion.button>
  );
}
