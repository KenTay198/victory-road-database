"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import type { INavLink } from "./navLinks";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  links: INavLink[];
  expanded: boolean;
}

const Navbar = ({ className, links, expanded, ...props }: IProps) => {
  return (
    <nav {...props} className={["flex flex-col gap-2 w-full py-5 justify-start", className].join(" ")}>
      {links.map((link) => {
        return <Navlink key={link.url} sidebarExpanded={expanded} {...link} />;
      })}
    </nav>
  );
};

interface NavLinkProps extends INavLink {
  sidebarExpanded: boolean;
}

const matchesRoutePattern = (currentPath: string, routePattern: string): boolean => {
  const regexPattern = routePattern.replace(/:\w+/g, "[^/]+").replace(/\//g, "\\/");
  const regex = new RegExp(`^${regexPattern}$`);
  return regex.test(currentPath);
};

const Navlink = ({ url, labelKey, Icon, sidebarExpanded, ...props }: NavLinkProps) => {
  const t = useTranslations("layout.navLinks");
  const label = t(labelKey);
  const [expanded, setExpanded] = useState(false);
  const pathname = usePathname();
  const currentPath = `/${pathname.split("/").slice(2).join("/")}`;

  const selected = url.includes(":") ? matchesRoutePattern(currentPath, url) : currentPath === url;

  const subLinks = props.subLinks ? props.subLinks.filter(({ hidden }) => !hidden) : [];
  const hasSubLinks = subLinks && subLinks.filter((link) => !link.hidden).length > 0;

  const hasSelectedSubLink = props.subLinks
    ? props.subLinks.some((subLink) => {
        if (subLink.url.includes(":")) {
          return matchesRoutePattern(currentPath, subLink.url);
        }
        return currentPath === subLink.url;
      })
    : false;

  const isParentSelected = selected || hasSelectedSubLink;

  const ToggleIcon = hasSubLinks ? (expanded ? FaChevronDown : FaChevronRight) : null;

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };

  useEffect(() => {
    if (hasSelectedSubLink) {
      setExpanded(true);
    }
  }, [hasSelectedSubLink]);

  return (
    <Link href={url.includes(":") ? "#" : url}>
      <div
        className={`flex items-center justify-between px-2 py-1 h-8 rounded cursor-pointer duration-200 hover:brightness-75 ${
          isParentSelected ? "bg-raimon-blue text-white" : "hover:bg-raimon-yellow/90"
        }`}
      >
        <div className="flex space-x-2 items-center">
          <Icon />
          <span className={`${sidebarExpanded ? "" : "max-laptop:hidden"}`}>{label}</span>
        </div>
        {ToggleIcon && <ToggleIcon onClick={toggleExpand} />}
      </div>

      {hasSubLinks && (
        <div className={`border-l ml-4 mt-2 flex flex-col ${expanded ? "block" : "hidden"}`}>
          {subLinks.map((subLink) => {
            return <Navlink key={subLink.url} sidebarExpanded={sidebarExpanded} {...subLink} />;
          })}
        </div>
      )}
    </Link>
  );
};

export default Navbar;
