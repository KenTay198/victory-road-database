"use client";
import type { CharacterArchetype } from "@character/character.types";
import ElementIcon from "@components/ui/ElementIcon";
import type { Element } from "@domain/types";
import { useTranslations } from "next-intl";
import type React from "react";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  property: string;
  value: any;
  asValue?: boolean;
}

const CharacterPropertyFormatter = ({ property, value, asValue, className }: IProps) => {
  const t = useTranslations("character");

  if (!value) return null;

  let strValue = value?.toString() ?? "";
  if (!asValue) {
    if (property === "element") {
      return <ElementIcon element={value as Element} />;
    } else if (property === "defaultPosition") {
      strValue = t(`positions.${value as string}`);
    } else if (property === "archetypes") {
      strValue = value.map((v: CharacterArchetype) => t(`archetypes.${v}`)).join(" / ");
    }
  }

  return <span className={className}>{strValue}</span>;
};

export default CharacterPropertyFormatter;
