import EarthImage from "@images/icons/elements/earth.png";
import FireImage from "@images/icons/elements/fire.png";
import WindImage from "@images/icons/elements/wind.png";
import ForestImage from "@images/icons/elements/forest.png";
import VoidImage from "@images/icons/elements/void.webp";
import { StaticImageData } from "next/image";

export const statisticsLabels = [
  "kick",
  "control",
  "pressure",
  "physical",
  "agility",
  "intelligence",
  "technique",
];

export const advancedStatisticsLabels = [
  "total-att",
  "shoot-att",
  "focus-att",
  "scramble-att",
  "total-def",
  "wall-def",
  "focus-def",
  "scramble-def",
  "gk",
];

export const elements = ["forest", "earth", "fire", "wind", "void"];

export const positions = ["goalkeeper", "forward", "defender", "midfielder"];

export const archetypes = [
  "striker",
  "forward",
  "long-shooter",
  "offensive-midfielder",
  "complete-midfielder",
  "defensive-midfielder",
  "complete-defender",
  "wall-defender",
  "goalkeeper",
  "none",
];

export const elementDatas: Record<
  string,
  { image: StaticImageData; color: string }
> = {
  earth: { image: EarthImage, color: "#E39B2E" },
  fire: { image: FireImage, color: "#E45D42" },
  wind: { image: WindImage, color: "#7BB3F7" },
  forest: { image: ForestImage, color: "#93E22B" },
  void: { image: VoidImage, color: "#6507DB" },
};

export const hissatsuTypeDatas: Record<string, { label: string }> = {
  kick: { label: "KICK" },
  keep: { label: "GK" },
  dribble: { label: "ATT" },
  defense: { label: "DEF" },
};
