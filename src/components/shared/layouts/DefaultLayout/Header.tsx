"use client";
import useNavLinks, { INavLink } from "@hooks/useNavLinks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

function Header() {
  const navLinks = useNavLinks();
  const pathname = usePathname();

  const isActive = (href: string) => {
    return href === pathname;
  };

  return (
    <header className="fixed top-0 left-0 w-full h-12 bg-raimon-yellow shadow z-10">
      <nav className="flex py-2 justify-center items-center gap-2 h-full">
        {navLinks.map((navLink) => (
          <NavLink
            key={`nav-link-${navLink.label}`}
            navLink={navLink}
            active={isActive(navLink.href)}
          />
        ))}
      </nav>
    </header>
  );
}

function NavLink({ navLink, active }: { navLink: INavLink; active: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const { href, label, subLinks } = navLink;
  const hasSublinks = subLinks && subLinks.length > 0;

  const ExpandIcon = expanded ? FaChevronUp : FaChevronDown;
  const maxHeight = hasSublinks && expanded ? 30 * subLinks.length : 0;

  return (
    <div className="relative">
      <div
        className={`text-lg font-semibold px-2 rounded duration-200 flex gap-1 items-center whitespace-nowrap ${
          active
            ? "bg-raimon-blue text-white"
            : "hover:bg-raimon-blue hover:bg-opacity-50"
        }`}
      >
        <Link href={href}>{label}</Link>
        {hasSublinks && <ExpandIcon onClick={() => setExpanded(!expanded)} />}
      </div>

      {hasSublinks && (
        <div
          style={{ maxHeight: `${maxHeight}px` }}
          className={`bg-white absolute top-[105%] rounded left-1/2 -translate-x-1/2 duration-300 overflow-hidden ${
            expanded ? "" : "pointer-events-none"
          }`}
        >
          <div
            className={`flex flex-col duration-200 ${
              expanded ? "opacity-100" : "opacity-0"
            }`}
          >
            {subLinks.map((sub) => (
              <NavLink
                key={`sub-link-${navLink.label}-${sub.label}`}
                navLink={sub}
                active={false}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
