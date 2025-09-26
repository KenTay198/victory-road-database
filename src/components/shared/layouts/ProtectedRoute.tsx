"use client";
import { useAuthState } from "@context/AuthContext";
import Link from "next/link";
import React from "react";

interface IProps {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: IProps) {
  const { user, authLoading } = useAuthState();

  if (authLoading) return <p>En attente de connexion...</p>;

  if (!user)
    return (
      <div className="text-center pt-10 text-xl">
        <p>You are not authenticated</p>
        <Link href="/login">
          <p className="underline font-semibold">Click here to sign in !</p>
        </Link>
      </div>
    );

  return children;
}

export default ProtectedRoute;
