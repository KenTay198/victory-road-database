import Link from "next/link";
import React from "react";
import { MdArrowBack } from "react-icons/md";
interface IProps extends React.HTMLAttributes<HTMLAnchorElement> {
  href: string;
  label: string;
}

function BackButton({ href, label, className, ...props }: IProps) {
  return (
    <Link
      {...props}
      href={href}
      className={["flex gap-1 items-center underline", className].join(" ")}
    >
        <MdArrowBack size={20}/>
      {label}
    </Link>
  );
}

export default BackButton;
