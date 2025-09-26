"use client";
import useNavLinks from "@hooks/useNavLinks";
import { usePathname } from "next/navigation";
import React from "react";
import NavLink from "./NavLink";
import UserCard from "./UserCard";

function Header() {
  const navLinks = useNavLinks();
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 w-full h-12 bg-raimon-yellow z-10 flex items-center justify-between px-5">
      <div>
        <p className="font-bold text-xl">Victory Road DB</p>
      </div>
      <nav className="flex justify-center items-center gap-2 h-full">
        {navLinks.map((navLink) => (
          <NavLink
            key={`nav-link-${navLink.label}`}
            navLink={navLink}
            pathname={pathname}
          />
        ))}
      </nav>
      <div className="h-full flex items-center">
        <UserCard />
      </div>
    </header>
  );
}

export default Header;
