"use client";
import { useRouter } from "next/navigation";
import type React from "react";
import type { IconType } from "react-icons";
import type { AppTemplate } from "@/utils/types";
import { getButtonsClassName, type IButtonSize } from "./utils";

interface IProps extends React.HTMLAttributes<HTMLButtonElement> {
  Icon: IconType;
  template: AppTemplate;
  title: string;
  size?: IButtonSize;
  link?: string;
  active?: boolean;
}

const IconButton = ({ className, onClick, link, children, size = "M", template, Icon, active, ...props }: IProps) => {
  //#region Click event
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (link) router.push(link);
    else if (onClick) onClick(e);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      if (link) router.push(link);
      else if (onClick) onClick(e as any);
    }
  };
  //#endregion

  return (
    <button
      {...props}
      aria-label={props.title}
      type="button"
      onClick={handleClick}
      onKeyUp={handleKeyUp}
      className={getButtonsClassName({ template, size, className, active, isButton: true })}
    >
      <Icon />
    </button>
  );
};

export default IconButton;
