import type { Position } from "./character.types";

export const statKeys = ["kick", "control", "pressure", "physical", "agility", "intelligence", "technique", "total"];

export const advancedStatKeys = [
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
