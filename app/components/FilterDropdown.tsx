"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

interface FilterDropdownProps {
  categories: string[];
  selectedCategories: string[];
  onToggleCategory: (category: string) => void;
}

export function FilterDropdown({
  categories,
  selectedCategories,
  onToggleCategory,
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Close on click outside & Escape key
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const activeCount = selectedCategories.length;

  return (
    <div ref={containerRef} className="relative inline-block">
      {/* Trigger */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex items-center gap-2 rounded-full border border-border-subtle px-4 py-2.5 text-sm font-medium text-text-primary transition-colors duration-150 ease hover:border-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.97]"
        style={{ touchAction: "manipulation" }}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={`Filter by category${activeCount > 0 ? `, ${activeCount} selected` : ""}`}
      >
        <span className="font-sans">Filter</span>

        {activeCount > 0 && (
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-text-primary px-1 text-[11px] font-semibold tabular-nums text-background">
            {activeCount}
          </span>
        )}

        {/* Chevron — rotates 180° on open */}
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{
            duration: 0.2,
            ease: [0.25, 0.46, 0.45, 0.94], // ease-out-quad
          }}
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden="true"
          className="will-change-transform"
        >
          <path
            d="M3.5 5.25L7 8.75L10.5 5.25"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </button>

      {/* Dropdown panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={
              shouldReduceMotion ? false : { opacity: 0, scale: 0.95, y: -4 }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={
              shouldReduceMotion
                ? undefined
                : { opacity: 0, scale: 0.95, y: -4 }
            }
            transition={{
              duration: 0.15,
              ease: [0.23, 1, 0.32, 1], // ease-out-quint
            }}
            style={{
              transformOrigin: "top left",
              willChange: "transform, opacity",
            }}
            className="absolute left-0 top-full z-50 mt-2 min-w-52 rounded-xl border border-border-subtle bg-background p-2 shadow-[0_8px_30px_rgb(0,0,0,0.08)]"
            role="group"
            aria-label="Filter options"
          >
            <p className="mb-1 px-2 pt-1 font-mono text-[11px] font-semibold uppercase tracking-widest text-text-secondary">
              Category
            </p>

            <div className="flex flex-col">
              {categories.map((category) => {
                const isChecked = selectedCategories.includes(category);
                return (
                  <label
                    key={category}
                    className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 text-sm text-text-primary transition-colors duration-150 ease hover:bg-accent-muted"
                    style={{ touchAction: "manipulation" }}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => onToggleCategory(category)}
                      className="sr-only"
                    />

                    {/* Custom checkbox */}
                    <span
                      className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[5px] border transition-colors duration-150 ease ${
                        isChecked
                          ? "border-text-primary bg-text-primary"
                          : "border-border-subtle bg-background"
                      }`}
                      aria-hidden="true"
                    >
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 11 11"
                        fill="none"
                        className={`transition-opacity duration-150 ease ${isChecked ? "opacity-100" : "opacity-0"}`}
                      >
                        <path
                          d="M2.5 5.5L4.5 7.5L8.5 3.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-background"
                        />
                      </svg>
                    </span>

                    <span className="select-none font-sans">{category}</span>
                  </label>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
