import type {
  CharacterArchetype,
  CharacterElement,
  IAdvancedStatistics,
  IStatistics,
  Position,
} from "./character.types";

export const statKeys: (keyof IStatistics)[] = [
  "kick",
  "control",
  "pressure",
  "physical",
  "agility",
  "intelligence",
  "technique",
  "total",
];

export const advancedStatKeys: (keyof IAdvancedStatistics)[] = [
  "shoot",
  "focusAtt",
  "scrambleAtt",
  "faceoffAtt",
  "totalAtt",
  "wall",
  "focusDef",
  "scrambleDef",
  "faceoffDef",
  "totalDef",
  "gk",
];

export const positions: Position[] = ["goalkeeper", "defender", "midfielder", "forward"];

export const archetypes: CharacterArchetype[] = [
  "striker",
  "forward",
  "long-shooter",
  "attacking-midfielder",
  "central-midfielder",
  "defensive-midfielder",
  "defender",
  "wall-defender",
  "goalkeeper",
  "none",
];

export const characterElements: CharacterElement[] = ["fire", "wind", "earth", "forest"];
