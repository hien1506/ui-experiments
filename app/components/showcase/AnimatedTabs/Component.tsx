"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";

const tabs = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
] as const;

export default function AnimatedTabs() {
  const [activeTab, setActiveTab] = useState<string>("design");
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8 bg-white px-6">
      <div
        className="flex gap-1 rounded-full border border-[#E5E5E5] bg-white p-1"
        role="tablist"
        aria-label="Feature tabs"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="relative z-10 flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-1 focus-visible:ring-offset-[#EEEEEE]"
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
                  className="absolute inset-0 rounded-full border border-[#f0f0f0] bg-[#f0f0f0]"
                  transition={{
                    type: "spring",
                    duration: 0.5,
                    bounce: 0.15,
                  }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
