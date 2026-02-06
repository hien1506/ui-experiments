import { ComponentType } from "react";

export interface ShowcaseMetadata {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: string;
  categorySecondary?: string;
  aspectRatio: "portrait" | "landscape" | "square";
  /** Path to preview video (e.g., "/previews/example.webm") */
  previewVideo?: string;
  /** Path to poster image shown before video loads */
  posterImage?: string;
}

export interface ShowcaseItem {
  metadata: ShowcaseMetadata;
  Component: ComponentType;
}

// Re-export the auto-generated items
export { SHOWCASE_ITEMS } from "./items";
