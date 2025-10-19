import { useMemo } from "react";
import Image, { type ImageProps } from "next/image";

interface IProps extends Omit<ImageProps, "src" | "alt"> {
  imageUrl?: string;
  fullName: string;
  size?: "S" | "M" | "L";
  preferredWidth?: number;
}

const CharacterImage = ({ className, imageUrl, fullName, preferredWidth, size = "S", ...props }: IProps) => {
  const { width, height } = useMemo(() => {
    const getWidth = () => {
      if (preferredWidth) return preferredWidth;
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
  }, [preferredWidth, size]);

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
