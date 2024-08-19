"use client";
import Button from "@atoms/Button";
import { useAuthState } from "@context/AuthContext";
import Link from "next/link";
import React, { useState } from "react";
import { FaPowerOff } from "react-icons/fa";
import { IoPersonCircle } from "react-icons/io5";
import { MdSpaceDashboard } from "react-icons/md";

function UserCard() {
  const [expanded, setExpanded] = useState(false);
  const { user } = useAuthState();

  if (!user)
    return (
      <Button color="blue" href="/login">
        Sign in
      </Button>
    );

  return (
    <div className="relative h-full flex items-center">
      <Button
        color="blue"
        icon={IoPersonCircle}
        iconSize={30}
        onClick={() => setExpanded(!expanded)}
      >
        <p className="font-semibold">{user.username}</p>
      </Button>
      {expanded && (
        <div className="bg-raimon-yellow absolute top-[105%] right-0 overflow-hidden rounded flex flex-col">
          <Link href="/dashboard" onClick={() => setExpanded(false)}>
            <div className="bg-raimon-yellow flex gap-1 items-center whitespace-nowrap px-2 py-1 duration-200 hover:brightness-75">
              <MdSpaceDashboard />
              <p className="font-semibold">Dashboard</p>
            </div>
          </Link>
          <div className="bg-raimon-yellow flex gap-1 items-center whitespace-nowrap px-2 py-1 duration-200 hover:brightness-75 cursor-pointer">
            <FaPowerOff />
            <p className="font-semibold">Se déconnecter</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserCard;
