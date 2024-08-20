import React from "react";
import Link from "next/link";
import { IconType } from "react-icons";

export type ButtonColor = "default" | "yellow" | "blue" | "success" | "error";

interface IProps extends React.HTMLAttributes<HTMLButtonElement> {
  color: ButtonColor;
  children: React.ReactNode;
  icon?: IconType;
  isActive?: boolean;
  iconSize?: number;
}

interface ILinkProps {
  href?: string;
  target?: "_blank";
}

function Button({ href, ...props }: IProps & ILinkProps) {
  if (href) return <LinkButton {...props} href={href} />;
  return <InnerButton {...props} />;
}

function LinkButton({
  href,
  target,
  ...props
}: IProps & Omit<ILinkProps, "href"> & { href: string }) {
  return (
    <Link href={href} target={target} className="flex w-fit">
      <InnerButton {...props} />
    </Link>
  );
}

function InnerButton({
  className,
  children,
  color,
  icon: Icon,
  isActive,
  iconSize,
  ...props
}: IProps) {
  const getClassName = () => {
    const classes: string[] = [
      "rounded font-bold px-2 py-1 border-2 duration-200 hover:bg-white",
    ];

    switch (color) {
      case "yellow": {
        classes.push(
          "bg-raimon-yellow border-raimon-yellow text-black hover:text-raimon-yellow"
        );
        if (isActive) classes.push("!text-raimon-yellow");
        break;
      }
      case "blue":
        classes.push(
          "bg-raimon-blue border-raimon-blue text-white hover:text-raimon-blue"
        );
        if (isActive) classes.push("!text-raimon-blue");
        break;
      case "success":
        classes.push(
          "bg-green-500 border-green-500 text-white hover:text-green-500"
        );
        if (isActive) classes.push("!text-green-500");
        break;
      case "error":
        classes.push("bg-red-500 border-red-500 text-white hover:text-red-500");
        if (isActive) classes.push("!text-red-500");
        break;
      default:
        classes.push("bg-black border-black text-white hover:text-black");
        if (isActive) classes.push("!text-black");
        break;
    }

    if (isActive) classes.push("bg-white");
    if (Icon) classes.push("flex items-center justify-center gap-2");
    if (className) classes.push(className);

    return classes.join(" ");
  };

  return (
    <button {...props} className={getClassName()}>
      {Icon && <Icon size={iconSize} />}
      {children}
    </button>
  );
}

export default Button;
