"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { Category } from "@/lib/types";
import { CloseIcon } from "@/components/icons";
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
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="scrollbar-thin fixed inset-y-0 left-0 z-50 flex w-[90%] max-w-[400px] flex-col overflow-y-auto bg-panel p-4 lg:hidden"
            role="dialog"
            aria-label="Tüm Kategoriler"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-[18px] font-semibold text-text">
                Tüm Kategoriler
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-card text-text-muted hover:text-text"
                aria-label="Kapat"
              >
                <CloseIcon className="h-4 w-4" />
              </button>
            </div>
            <div className="flex flex-col gap-3">
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
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
