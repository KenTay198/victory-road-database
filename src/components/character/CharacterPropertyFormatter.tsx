"use client";
import type React from "react";
import type { CharacterArchetype } from "@character/character.types";
import HissatsuNameItem from "@components/hissatsus/HissatsuNameItem";
import ElementIcon from "@components/ui/ElementIcon";
import type { Element } from "@domain/shared/types";
import type { IHissatsu } from "@hissatsu/hissatsu.types";
import { useTranslations } from "next-intl";

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
    } else if (property.startsWith("hissatsus")) {
      return <HissatsuNameItem hissatsu={value as IHissatsu} />;
    }
  }

  return <span className={className}>{strValue}</span>;
};

export default CharacterPropertyFormatter;
