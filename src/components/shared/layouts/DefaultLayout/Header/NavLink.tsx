import { INavLink } from "@hooks/useNavLinks";
import Link from "next/link";
import React, { useState } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  navLink: INavLink;
  pathname: string;
}

function NavLink({ navLink, className, pathname, ...props }: IProps) {
  const [expanded, setExpanded] = useState(false);
  const { href, label, subLinks } = navLink;
  const hasSublinks = subLinks && subLinks.length > 0;

  const ExpandIcon = expanded ? FaChevronUp : FaChevronDown;
  const maxHeight = hasSublinks && expanded ? 24 * subLinks.length : 0;

  const isActive = (href: string) => href === pathname;
  const active = isActive(href);

  return (
    <div {...props} className="relative h-full flex items-center">
      <div
        className={[
          `text-lg font-semibold px-2 rounded duration-200 flex gap-1 items-center whitespace-nowrap ${
            active
              ? "bg-raimon-blue text-white"
              : "hover:bg-raimon-blue hover:bg-opacity-40"
          }`,
          className,
        ].join(" ")}
      >
        <Link href={href}>{label}</Link>
        {hasSublinks && <ExpandIcon onClick={() => setExpanded(!expanded)} />}
      </div>

      {hasSublinks && (
        <div
          style={{ maxHeight: `${maxHeight}px` }}
          className={`bg-raimon-yellow absolute top-[105%] rounded left-1/2 -translate-x-1/2 duration-300 overflow-hidden ${
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
                pathname={pathname}
                navLink={sub}
                className="!text-base"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default NavLink;
