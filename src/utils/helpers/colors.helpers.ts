import type { AppTemplate } from "@utils/types";
import type { IStatisticDescriptions } from "./numeric.helpers";

const ColorsHelper = {
  getTemplateColor(template: AppTemplate): {
    value: string;
    accent: string;
  } {
    switch (template.toLowerCase()) {
      case "blue":
        return { value: "var(--color-raimon-blue)", accent: "white" };
      case "yellow":
        return { value: "var(--color-raimon-yellow)", accent: "black" };
      case "fire":
        return { value: "var(--color-fire)", accent: "white" };
      case "earth":
        return { value: "var(--color-earth)", accent: "black" };
      case "wind":
        return { value: "var(--color-wind)", accent: "white" };
      case "forest":
        return { value: "var(--color-forest)", accent: "white" };
      case "void":
        return { value: "var(--color-void)", accent: "white" };
      default:
        throw new Error(`Unknown template: ${template}`);
    }
  },

  getColorByTier: (value: number, description?: IStatisticDescriptions): string => {
    let color = "#000";
    if (description) {
      const { mean, highMean, lowMean } = description;

      // Top-tier - Dark Green
      if (value >= highMean) color = "#1A9641";
      // High-tier - Green
      else if (value > mean) color = "#8DB333";
      // Mid-tier - Yellow
      else if (value === mean) color = "#F9B917";
      else if (value < mean) {
        // Bottom-tier - Red
        if (value <= lowMean) color = "#D7191C";
        // Low-tier - Orange
        else color = "#E65E20";
      }
    }
    return color;
  },
};

export default ColorsHelper;
