"use client";
import ElementIcon from "@components/ui/ElementIcon";
import type { Element } from "@domain/types";
import { useTranslations } from "next-intl";
import type React from "react";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  property: string;
  value: any;
  asValue?: boolean;
}

const HissatsuPropertyFormatter = ({ property, value, asValue, className }: IProps) => {
  const t = useTranslations("");

  if (!value && property !== "characteristic") return null;

  let strValue = value?.toString() ?? "";
  if (!asValue) {
    if (property === "element") {
      return <ElementIcon element={value as Element} />;
    } else if (property === "type") {
      strValue = t(`hissatsu.types.${value}`);
    } else if (property === "characteristic") {
      strValue = value ? t(`hissatsu.characteristics.${value}`) : t("common.none", { feminine: "e" });
    }
  }

  return <span className={className}>{strValue}</span>;
};

export default HissatsuPropertyFormatter;
