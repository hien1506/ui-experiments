"use client";

import { SHOWCASE_ITEMS } from "./showcase/items";
import { ShowcaseWrapper } from "./showcase/ShowcaseWrapper";

const aspectRatioClasses = {
  portrait: "aspect-[9/16]",
  landscape: "aspect-video",
  square: "aspect-square",
};

export default function Grid() {
  return (
    <ul
      className="grid grid-cols-1 gap-5 lg:grid-cols-2"
      role="list"
      aria-label="Micro interaction showcases"
    >
      {SHOWCASE_ITEMS.map((item) => (
        <li
          key={item.metadata.id}
          className="group overflow-hidden border border-border-subtle bg-surface"
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
                <h3 className="truncate text-lg font-sans font-semibold text-text-primary">
                  {item.metadata.title}
                </h3>
                <p className="mt-0.5 truncate font-sans text-sm text-text-secondary">
                  {item.metadata.description}
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-accent-muted px-4 py-2 text-xs font-mono font-semibold uppercase tracking-wider text-text-secondary">
                {item.metadata.category}
              </span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
