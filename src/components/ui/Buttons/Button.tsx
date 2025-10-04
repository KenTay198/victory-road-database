"use client";
import { useRouter } from "next/navigation";
import type React from "react";
import type { AppTemplate } from "@/utils/types";
import { getButtonsClassName, type IButtonSize } from "./utils";

interface IProps extends React.HTMLAttributes<HTMLButtonElement> {
  template: AppTemplate;
  size?: IButtonSize;
  link?: string;
  active?: boolean;
  disabled?: boolean;
}

const Button = ({ className, onClick, link, children, size = "M", template, active, disabled, ...props }: IProps) => {
  //#region Click event
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (link) router.push(link);
    else if (onClick) onClick(e);
  };
  //#endregion

  return (
    <button
      {...props}
      onClick={handleClick}
      className={getButtonsClassName({ template, size, className, active, disabled })}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
