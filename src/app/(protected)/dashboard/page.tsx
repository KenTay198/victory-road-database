"use client";
import { useAuthState } from "@context/AuthContext";
import React from "react";

function DashboardAdmin() {
  const user = useAuthState().user!;

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Welcome {user.username}</h2>
    </div>
  );
}

export default DashboardAdmin;
