"use client";
import { useRouter } from "next/navigation";
import type React from "react";
import type { AppTemplate } from "@/utils/types";
import { getButtonsClassName, type IButtonSize } from "./utils";
import type { IconType } from "react-icons";

interface IProps extends React.HTMLAttributes<HTMLButtonElement> {
  template: AppTemplate;
  Icon?: IconType;
  size?: IButtonSize;
  link?: string;
  active?: boolean;
  disabled?: boolean;
}

const Button = ({
  className,
  onClick,
  link,
  children,
  size = "M",
  template,
  active,
  disabled,
  Icon,
  ...props
}: IProps) => {
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
      className={`${getButtonsClassName({ template, size, className, active, disabled })} ${Icon ? "flex gap-1 items-center" : ""}`}
      disabled={disabled}
    >
      {Icon && <Icon className={children ? "mr-2" : ""} />}
      {children}
    </button>
  );
};

export default Button;
