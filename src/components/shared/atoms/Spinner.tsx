"use client";
import React from "react";

interface IProps {
  size?: number;
}

export const Spinner = ({ size = 256 }: IProps) => {
  return (
    <div className="absolute right-1/2 bottom-1/2 translate-x-1/2 translate-y-1/2 ">
      <div
        style={{ width: `${size}px`, height: `${size}px` }}
        className="border-t-transparent border-solid animate-spin rounded-full border-raimon-yellow border-8 h-64 w-64"
      ></div>
    </div>
  );
};

export const TinySpinner = () => {
  return (
    <div className="relative">
      <div className="border-t-transparent border-solid animate-spin rounded-full border-raimon-yellow border-4 h-20 w-20"></div>
    </div>
  );
};
