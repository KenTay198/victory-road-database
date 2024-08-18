import { Spinner } from "@atoms/Spinner";
import React from "react";

function LoadingPage() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Spinner />
    </div>
  );
}

export default LoadingPage;
