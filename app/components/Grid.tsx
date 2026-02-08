"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { SHOWCASE_ITEMS } from "./showcase/items";
import { ShowcaseWrapper } from "./showcase/ShowcaseWrapper";
import { FilterDropdown } from "./FilterDropdown";

const aspectRatioClasses = {
  portrait: "aspect-[9/16]",
  landscape: "aspect-video",
  square: "aspect-square",
};

export default function Grid() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const shouldReduceMotion = useReducedMotion();

  // Extract unique categories from all showcase items
  const categories = useMemo(() => {
    const cats = new Set<string>();
    SHOWCASE_ITEMS.forEach((item) => {
      cats.add(item.metadata.category);
      if (item.metadata.categorySecondary) {
        cats.add(item.metadata.categorySecondary);
      }
    });
    return Array.from(cats).sort();
  }, []);

  // Filter items based on selected categories
  const filteredItems = useMemo(() => {
    if (selectedCategories.length === 0) return SHOWCASE_ITEMS;
    return SHOWCASE_ITEMS.filter(
      (item) =>
        selectedCategories.includes(item.metadata.category) ||
        (item.metadata.categorySecondary &&
          selectedCategories.includes(item.metadata.categorySecondary)),
    );
  }, [selectedCategories]);

  const handleToggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  return (
    <section>
      {/* Filter bar */}
      <div className="mb-6 flex items-center justify-between">
        <FilterDropdown
          categories={categories}
          selectedCategories={selectedCategories}
          onToggleCategory={handleToggleCategory}
        />
        <p className="font-mono text-sm tabular-nums text-text-secondary">
          {filteredItems.length === SHOWCASE_ITEMS.length
            ? `${SHOWCASE_ITEMS.length} experiment${SHOWCASE_ITEMS.length !== 1 ? "s" : ""}`
            : `${filteredItems.length} of ${SHOWCASE_ITEMS.length}`}
        </p>
      </div>

      {/* Columns Layout */}
      <ul
        className="columns-1 gap-5 lg:columns-2"
        role="list"
        aria-label="Micro interaction showcases"
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => (
            <motion.li
              key={item.metadata.id}
              layout
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={
                shouldReduceMotion ? undefined : { opacity: 0, scale: 0.97 }
              }
              transition={{
                opacity: { duration: 0.2, ease: [0.23, 1, 0.32, 1] },
                scale: { duration: 0.2, ease: [0.23, 1, 0.32, 1] },
                layout: { duration: 0.25, ease: [0.23, 1, 0.32, 1] },
              }}
              className="group mb-5 break-inside-avoid overflow-hidden rounded-xl border border-border-subtle bg-surface"
              style={{ touchAction: "manipulation" }}
            >
              {/* Live Component Preview */}
              <div
                className={`${aspectRatioClasses[item.metadata.aspectRatio]} w-full overflow-hidden`}
              >
                <ShowcaseWrapper>
                  <item.Component />
                </ShowcaseWrapper>
              </div>

              {/* Card Footer */}
              <div className="border-t border-border-subtle px-5 py-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="truncate font-sans text-lg font-semibold text-text-primary">
                      {item.metadata.title}
                    </h3>
                    <p className="mt-0.5 truncate font-sans text-sm text-text-secondary">
                      {item.metadata.description}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-accent-muted px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-text-secondary">
                    {item.metadata.category}
                  </span>
                </div>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      {/* Empty state */}
      <AnimatePresence>
        {filteredItems.length === 0 && (
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <p className="font-sans text-lg text-text-secondary">
              No experiments match the selected filters
            </p>
            <button
              onClick={() => setSelectedCategories([])}
              className="mt-3 text-sm font-medium text-text-primary underline underline-offset-4 transition-colors duration-150 ease hover:text-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-primary focus-visible:ring-offset-2"
              style={{ touchAction: "manipulation" }}
            >
              Clear filters
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
