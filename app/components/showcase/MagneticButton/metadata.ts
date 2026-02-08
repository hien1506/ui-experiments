import type { ShowcaseMetadata } from "../registry";

export const metadata: ShowcaseMetadata = {
  id: "magnetic-button",
  title: "Magnetic Button",
  description: "Button that follows cursor with spring physics",
  longDescription:
    "Interactive button that magnetically follows the cursor within a constrained area. Uses spring physics for smooth, natural motion with velocity-based momentum. Returns to center when cursor leaves.",
  category: "Interaction",
  aspectRatio: "square",
};
