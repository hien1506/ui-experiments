"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

const tabs = [
  { id: "design", label: "Design", icon: "◆" },
  { id: "develop", label: "Develop", icon: "⬡" },
  { id: "deploy", label: "Deploy", icon: "▲" },
] as const;

const content: Record<string, { heading: string; body: string }> = {
  design: {
    heading: "Pixel Perfect",
    body: "Every interface begins with intention. Craft each detail with purpose and care.",
  },
  develop: {
    heading: "Built to Scale",
    body: "Modern tools and patterns that grow alongside your ambition.",
  },
  deploy: {
    heading: "Ship Fast",
    body: "From local to production in seconds. Confidence at every step.",
  },
};

export default function AnimatedTabs() {
  const [activeTab, setActiveTab] = useState<string>("design");
  const shouldReduceMotion = useReducedMotion();
  const activeContent = content[activeTab];

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8 bg-white px-6">
      {/* Tab bar */}
      <div
        className="flex gap-1 rounded-xl border border-[#E5E5E5] bg-[#EEEEEE] p-1"
        role="tablist"
        aria-label="Feature tabs"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="relative z-10 flex items-center gap-1.5 rounded-[10px] px-4 py-2.5 text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-1 focus-visible:ring-offset-[#EEEEEE]"
              style={{
                color: isActive ? "#111111" : "#999999",
              }}
              role="tab"
              aria-selected={isActive}
              aria-controls={`tabpanel-${tab.id}`}
              id={`tab-${tab.id}`}
            >
              {isActive && (
                <motion.div
                  layoutId={
                    shouldReduceMotion ? undefined : "active-tab-indicator"
                  }
                  className="absolute inset-0 rounded-[10px] border border-[#E0E0E0] bg-white"
                  transition={{
                    type: "spring",
                    duration: 0.5,
                    bounce: 0.15,
                  }}
                />
              )}
              <span className="relative z-10 text-xs opacity-40">
                {tab.icon}
              </span>
              <span className="relative z-10">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div
        className="flex h-14 w-full max-w-xs items-start justify-center text-center"
        role="tabpanel"
        id={`tabpanel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={
              shouldReduceMotion
                ? false
                : { opacity: 0, y: 8, filter: "blur(4px)" }
            }
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={
              shouldReduceMotion
                ? undefined
                : { opacity: 0, y: -8, filter: "blur(4px)" }
            }
            transition={{
              duration: 0.2,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <p className="text-sm font-semibold text-[#111111]">
              {activeContent.heading}
            </p>
            <p className="mt-1 text-[13px] leading-relaxed text-[#999999]">
              {activeContent.body}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
