"use client";
import React, { useState } from "react";
import LocaleSwitcher from "../LocaleSwitcher";
import { useAuth } from "@context/AuthContext";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import useClickOutside from "@/hooks/useClickOutside";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex items-center gap-4 w-full h-12 py-2 px-2 justify-between bg-raimon-yellow mb-2 rounded-lg">
      <p className="max-mobile:invisible max-mobile:w-0 font-bold text-lg">Victory Road Database</p>
      <div className="flex items-center gap-4">
        <LocaleSwitcher />
        <UserCard />
      </div>
    </header>
  );
};

const UserCard = () => {
  const [expanded, setExpanded] = useState(false);
  const { user } = useAuth();

  const ref = useClickOutside<HTMLButtonElement>({ onClickOutside: () => setExpanded(false) });

  const Icon = expanded ? IoChevronUp : IoChevronDown;

  return (
    <button
      ref={ref}
      className="relative flex items-center gap-2 border-l border-raimon-yellow-dark pl-4 cursor-pointer"
      onClick={() => setExpanded(!expanded)}
      onKeyUp={() => setExpanded(!expanded)}
      type="button"
    >
      <p className="max-mobile:hidden text-sm font-bold">{user?.username || "Guest"}</p>
      <Icon />
      {expanded && <UserMenu isAuth={!!user} />}
    </button>
  );
};

const UserMenu = ({ isAuth }: { isAuth: boolean }) => {
  const { logout } = useAuth();

  return (
    <div className="absolute top-[105%] right-0 mt-2 w-36 bg-white border border-gray-300 rounded-lg shadow-lg">
      <ul className="py-1">
        {isAuth ? (
          <>
            <li className="px-4 py-2 cursor-pointer duration-200 hover:bg-gray-100">Profile</li>
            <li
              className="px-4 py-2 cursor-pointer duration-200 hover:bg-gray-100"
              onClick={() => logout()}
              onKeyUp={() => logout()}
            >
              Logout
            </li>
          </>
        ) : (
          <>
            <li className="px-4 py-2 cursor-pointer duration-200 hover:bg-gray-100">
              <Link href="/login">Login</Link>
            </li>
            <li className="px-4 py-2 cursor-pointer duration-200 hover:bg-gray-100">
              <Link href="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Header;
