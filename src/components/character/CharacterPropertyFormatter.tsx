"use client";
import type React from "react";
import type { CharacterArchetype } from "@character/character.types";
import HissatsuNameItem from "@components/hissatsus/HissatsuNameItem";
import ElementIcon from "@components/ui/ElementIcon";
import type { Element } from "@domain/shared/types";
import type { IHissatsu } from "@hissatsu/hissatsu.types";
import { useTranslations } from "next-intl";
import Character from "@character/entities/character.entity";
import { FaInfoCircle } from "react-icons/fa";

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
      const archetypes = value.map((v: CharacterArchetype) => t(`archetypes.${v}`)).join(" / ");
      const shortArchetypes = value.map((v: CharacterArchetype) => Character.getShortArchetype(v)).join(" / ");
      return (
        <div className="flex items-center gap-1" title={archetypes}>
          <span>{shortArchetypes}</span>
          <span>
            <FaInfoCircle size={12} />
          </span>
        </div>
      );
    } else if (property.startsWith("hissatsus")) {
      return <HissatsuNameItem hissatsu={value as IHissatsu} />;
    }
  }

  return <span className={className}>{strValue}</span>;
};

export default CharacterPropertyFormatter;
