"use client";
import { useAuthState } from "@context/AuthContext";
import Link from "next/link";
import React from "react";

function Dashboard() {
  const { user } = useAuthState();

  if (!user)
    return (
      <div className="text-center pt-10 text-xl">
        <p>You are not authenticated</p>
        <Link href="/login">
          <p className="underline font-semibold">Click here to sign in !</p>
        </Link>
      </div>
    );

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Welcome {user.username}</h2>
    </div>
  );
}

export default Dashboard;
