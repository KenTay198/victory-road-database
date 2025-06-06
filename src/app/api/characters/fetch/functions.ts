import { ICharacterNames, IStatistics, Position } from "@/types/character.types";
import { capitalize } from "@utils/functions";
import { gameName, queryMemberElements } from "./variables";
import { Element } from "@/types/types";
import { positionAbreviations } from "@utils/variables";

export const getPlayerStats = (revisionContent: string): IStatistics => {
  const tabRegex = new RegExp(`\\{\\{Tab\\s*\\|\\s*${gameName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*\\|([\\s\\S]*?)\\}\\}`, "i");
  const match = revisionContent.match(tabRegex);

  const stats: IStatistics = {
    kick: 0,
    control: 0,
    pressure: 0,
    physical: 0,
    agility: 0,
    intelligence: 0,
    technique: 0,
  };

  if (!match) return stats;

  const block = match[1];

  // Extraire chaque stat en ligne du bloc
  const statRegex = /\*\s*'''([^']+)'''\s*:\s*(\d+)/g;

  let statMatch;
  while ((statMatch = statRegex.exec(block)) !== null) {
    const statName = statMatch[1].trim();
    const statValue = parseInt(statMatch[2]);
    stats[statName.toLowerCase() as keyof IStatistics] = statValue;
  }

  return stats;
};

const extractNameParts = (fullName: string) => {
  const parts = fullName.trim().split(/\s+/);
  return {
    firstName: parts[0] || "",
    lastName: parts.length > 1 ? parts.slice(1).join(" ") : undefined,
  };
};

export const getPlayerNames = (revisionContent: string): ICharacterNames => {
  // On capture ce qu'il y a entre |name= et une fin de ligne ou le prochain pipe |
  const nameMatch = revisionContent.match(/\|name\s*=\s*(.+)(\n|\r|\||$)/i);
  // On capture ce qu'il y a entre |name_dub= et une fin de ligne ou le prochain pipe |
  const nameDubMatch = revisionContent.match(/\|name_dub\s*=\s*(.+)(\n|\r|\||$)/i);

  const ogFullName = nameMatch ? nameMatch[1].trim() : "";
  const dubFullName = nameDubMatch ? nameDubMatch[1].trim() : "";

  return {
    og: extractNameParts(ogFullName),
    dub: extractNameParts(dubFullName),
  };
};

export const getPlayerElement = (revisionContent: string): Element | null => {
  // On capture ce qu'il y a entre |element= et une fin de ligne ou le prochain pipe |
  const elementMatch = revisionContent.match(/\|element\s*=\s*(.+)(\n|\r|\||$)/i);

  const element = elementMatch ? elementMatch[1].trim() : "";

  console.log(element.toLowerCase());

  switch (element.toLowerCase()) {
    case "endou":
      return "earth";
    default:
      if (!queryMemberElements.includes(capitalize(element))) {
        return null;
      }

      return element as Element;
  }
};

export const getPlayerPosition = (revisionContent: string): Position | null => {
  // On capture ce qu'il y a entre |position= et une fin de ligne ou le prochain pipe |
  const positionMatch = revisionContent.match(/\|position\s*=\s*(.+)(\n|\r|\||$)/i);
  // On capture ce qu'il y a entre |type= et une fin de ligne ou le prochain pipe |
  const typeMatch = revisionContent.match(/\|type\s*=\s*(.+)(\n|\r|\||$)/i);

  const position = positionMatch ? positionMatch[1].trim() : "";
  const type = typeMatch ? typeMatch[1].trim() : "";

  let value = [type, position].find((p) => !!p)?.split(",")[0];

  console.log(position, type, value);

  if (!value) {
    return null;
  }

  value = positionAbreviations[value];

  if (!value) {
    return null;
  }

  return value as Position;
};
