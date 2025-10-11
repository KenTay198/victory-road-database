import React from "react";
import { getCurrentUserAction } from "@/actions/auth.actions";
import { notFound } from "next/navigation";

const ProtectedRoute = async ({ children }: React.HTMLAttributes<HTMLDivElement>) => {
  const user = await getCurrentUserAction();
  if (!user) return notFound();
  return children;
};

export default ProtectedRoute;
