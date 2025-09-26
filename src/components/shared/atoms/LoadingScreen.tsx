"use client";
import React from "react";
import { TinySpinner } from "./Spinner";
import ProgressBar from "./ProgressBar";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  message?: string;
  progressBar?: {
    current: number;
    total: number;
    width?: number;
    className?: string;
  };
}

const LoadingScreen = ({ message, progressBar, children }: IProps) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-[11] bg-white/40 flex items-center justify-center px-2">
      <div className="flex flex-col items-center justify-center gap-2  text-primary max-w-full">
        <TinySpinner />
        {progressBar && (
          <ProgressBar className={progressBar.className} color={"#a02"} width={progressBar.width} value={progressBar.current} total={progressBar.total} />
        )}
        <p className="font-bold text-center whitespace-pre">{message || "Votre demande est en train d'être traitée. Veuillez patienter."}</p>
        {children}
      </div>
    </div>
  );
};

export default LoadingScreen;
