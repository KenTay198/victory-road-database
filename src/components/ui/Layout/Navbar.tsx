"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import type { INavLink } from "./navLinks";
import { useRouter } from "next/navigation";
import { useAuth } from "@context/AuthContext";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";

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
  const { user } = useAuth();
  const label = t(labelKey);

  const adminCheck = !props.isAdmin || user?.role === "admin";

  const router = useRouter();
  const handleClick = () => {
    router.push(url.includes(":") ? "#" : url);
  };

  //#region SUBLINKS EXPAND
  const [expanded, setExpanded] = useState(false);
  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };
  const subLinks = props.subLinks ? props.subLinks.filter(({ hidden }) => !hidden) : [];
  const hasSubLinks =
    subLinks && subLinks.filter((link) => !link.hidden && (!link.isAdmin || user?.role === "admin")).length > 0;
  const ToggleIcon = hasSubLinks ? (expanded ? IoChevronUp : IoChevronDown) : null;
  //#endregion

  //#region IS SELECTED
  const pathname = usePathname();
  const currentPath = `/${pathname.split("/").slice(2).join("/")}`;
  const selected = url.includes(":") ? matchesRoutePattern(currentPath, url) : currentPath === url;
  const hasSelectedSubLink = props.subLinks
    ? props.subLinks.some((subLink) => {
        if (subLink.url.includes(":")) {
          return matchesRoutePattern(currentPath, subLink.url);
        }
        return currentPath === subLink.url;
      })
    : false;
  const isParentSelected = selected || hasSelectedSubLink;

  useEffect(() => {
    if (hasSelectedSubLink) {
      setExpanded(true);
    }
  }, [hasSelectedSubLink]);
  //#endregion

  if (!adminCheck) return null;

  return (
    <div>
      <button
        onClick={handleClick}
        onKeyUp={handleClick}
        type="button"
        className={`flex w-full items-center justify-between px-2 py-1 h-8 rounded cursor-pointer duration-200 hover:brightness-75 ${
          isParentSelected ? "bg-raimon-blue text-white" : "hover:bg-raimon-yellow/90"
        }`}
      >
        <div className="flex space-x-2 items-center">
          <Icon />
          <span className={`${sidebarExpanded ? "" : "max-laptop:hidden"}`}>{label}</span>
        </div>
        {ToggleIcon && <ToggleIcon size={20} onClick={toggleExpand} />}
      </button>

      {hasSubLinks && (
        <div
          className={`border-l border-l-raimon-yellow-dark ml-1 pl-1 mt-2 flex flex-col ${expanded ? "block" : "hidden"}`}
        >
          {subLinks.map((subLink) => {
            return <Navlink key={subLink.url} sidebarExpanded={sidebarExpanded} {...subLink} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Navbar;
