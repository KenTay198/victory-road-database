"use client";
import React, { HTMLAttributes } from "react";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  total: number;
  value: number;
  color: string;
  height?: number;
  width?: number;
  backgroundColor?: string;
}

const ProgressBar = ({
  backgroundColor = "#505050",
  color,
  total,
  value,
  height = 15,
  width = 500,
  className,
  ...props
}: IProps) => {
  const percentage = total === 0 ? 0 : (value / total) * 100;

  return (
    <div
      {...props}
      style={{ backgroundColor, width: width + "px", height: height + "px" }}
      className={["rounded-full overflow-hidden", className].join(" ")}
    >
      <div
        style={{ backgroundColor: color, width: percentage + "%" }}
        className="h-full"
      ></div>
    </div>
  );
};

export default ProgressBar;
