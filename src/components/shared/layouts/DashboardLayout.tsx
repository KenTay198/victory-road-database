"use client";
import Button from "@atoms/Button";
import { usePathname } from "next/navigation";
import React from "react";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/rosters", label: "My rosters" },
  { href: "/dashboard/favorites", label: "My favorite characters" },
];

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isActive = (href: string) => href === pathname;

  return (
    <div className="p-5">
      <nav className="flex gap-2 border-b py-2">
        {links.map(({ href, label }) => (
          <Button
            key={`dashboard-links-${label}`}
            href={href}
            color="blue"
            isActive={isActive(href)}
          >
            {label}
          </Button>
        ))}
      </nav>
      {children}
    </div>
  );
}

export default DashboardLayout;
