import { Element } from "@/types/types";
import { elementDatas } from "@utils/variables";
import Image, { ImageProps } from "next/image";
import React from "react";

interface IProps extends Omit<ImageProps, "src" | "alt"> {
  element: Element;
}

function ElementImage({ element, width, height, ...props }: IProps) {
  return (
    <Image
      {...props}
      src={elementDatas[element].image}
      alt={`Element ${element}`}
      width={width || 25}
      height={height || 25}
    />
  );
}

export default ElementImage;
