import type Character from "@character/entities/character.entity";
import Image, { type ImageProps } from "next/image";
import React, { useMemo } from "react";

interface IProps extends Omit<ImageProps, "src" | "alt"> {
  character: Character;
  size?: "small" | "medium" | "large";
}

const CharacterImage = ({ className, character, size = "small", ...props }: IProps) => {
  const { width, height } = useMemo(() => {
    const getWidth = () => {
      switch (size) {
        case "medium":
          return 128;
        case "large":
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

  if (!character.imageUrl) return null;

  return (
    <Image
      {...props}
      src={character.imageUrl}
      alt={character.fullName}
      width={width}
      height={height}
      className={["", className].join(" ")}
    />
  );
};

export default CharacterImage;
