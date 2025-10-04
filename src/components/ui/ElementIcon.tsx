"use client";
import type { Element } from "@domain/types";
import EarthIcon from "@images/icons/elements/earth.png";
import FireIcon from "@images/icons/elements/fire.png";
import ForestIcon from "@images/icons/elements/forest.png";
import VoidIcon from "@images/icons/elements/void.webp";
import WindIcon from "@images/icons/elements/wind.png";
import Image, { type StaticImageData } from "next/image";
import { useTranslations } from "next-intl";
import type React from "react";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  element: Element;
}

const ElementIcon = ({ element }: IProps) => {
  const t = useTranslations("elements");
  let src: StaticImageData;

  switch (element) {
    case "fire":
      src = FireIcon;
      break;
    case "earth":
      src = EarthIcon;
      break;
    case "wind":
      src = WindIcon;
      break;
    case "forest":
      src = ForestIcon;
      break;
    case "void":
      src = VoidIcon;
      break;
    default:
      src = FireIcon;
  }

  if (!src) return null;

  return <Image title={t(element)} src={src} alt={`Element icon for ${element}`} />;
};

export default ElementIcon;
