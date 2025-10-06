import React, { useMemo } from "react";
import Image, { type ImageProps } from "next/image";

interface IProps extends Omit<ImageProps, "src" | "alt"> {
  imageUrl?: string;
  fullName: string;
  size?: "S" | "M" | "L";
}

const CharacterImage = ({ className, imageUrl, fullName, size = "S", ...props }: IProps) => {
  const { width, height } = useMemo(() => {
    const getWidth = () => {
      switch (size) {
        case "M":
          return 128;
        case "L":
          return 256;
        default:
          return 64;
      }
    };

    const ratio = 238 / 208;
    const width = getWidth();
    const height = width * ratio;
    return { width, height };
  }, [size]);

  if (!imageUrl) return null;

  return (
    <Image
      {...props}
      src={imageUrl}
      alt={fullName}
      width={width}
      height={height}
      className={["", className].join(" ")}
    />
  );
};

export default CharacterImage;
