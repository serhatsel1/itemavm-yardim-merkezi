"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Category } from "@/lib/types";
import { CloseIcon, GridIcon } from "@/components/icons";
import { SidebarCategory } from "./SidebarCategory";

export function MobileCategoryDrawer({
  open,
  onClose,
  categories,
  expandedIds,
  onToggleCategory,
  activeSlug,
  onSelectArticle,
}: {
  open: boolean;
  onClose: () => void;
  categories: Category[];
  expandedIds: Set<string>;
  onToggleCategory: (id: string) => void;
  activeSlug: string | null;
  onSelectArticle: (slug: string) => void;
}) {
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/60 md:hidden"
          />

          {/* Bottom sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 z-50 flex max-h-[90vh] flex-col rounded-t-[20px] border-t-2 border-white/10 bg-panel md:hidden"
            role="dialog"
            aria-label="Kategoriler"
          >
            {/* Header */}
            <div className="relative flex shrink-0 flex-col items-center px-4 pt-6">
              <div className="flex items-center gap-2.5">
                <GridIcon className="h-6 w-6 text-white" />
                <span className="text-[18px] font-semibold leading-[1.333] tracking-[-0.006em] text-white">
                  Kategoriler
                </span>
              </div>

              {/* Close button */}
              <button
                type="button"
                onClick={onClose}
                className="absolute right-4 top-6 flex h-7.5 w-7.5 items-center justify-center text-white"
                aria-label="Kapat"
              >
                <CloseIcon className="h-3.25 w-3.25" />
              </button>

              {/* Divider */}
              <div className="mt-4 h-px w-4/5 bg-divider" />
            </div>

            {/* Category list */}
            <div className="scrollbar-thin flex-1 overflow-y-auto px-4 pb-8 pt-6">
              <div className="mx-auto flex w-full max-w-100 flex-col gap-4">
                {categories.map((category) => (
                  <SidebarCategory
                    key={category.id}
                    category={category}
                    expanded={expandedIds.has(category.id)}
                    activeSlug={activeSlug}
                    onToggle={onToggleCategory}
                    onSelect={(slug) => {
                      onSelectArticle(slug);
                      onClose();
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
