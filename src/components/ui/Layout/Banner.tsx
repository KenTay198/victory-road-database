import React from "react";
import { useTranslations } from "next-intl";
import { type INavLink, navLinks } from "./navLinks";

type PathSegment = { value: string; label?: string };

type BreadcrumbSegment = {
  name: string;
  href: string;
};

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  path: PathSegment[];
}

const Banner = ({ className, title, path, ...props }: IProps) => {
  const t = useTranslations("layout.navLinks");

  const isNavItemMatching = (navLink: INavLink, segment: PathSegment, parentPath?: string): boolean => {
    let matchingSegment = navLink.url;
    if (parentPath) {
      matchingSegment = navLink.url.replace(parentPath, "");
    }
    if (matchingSegment.startsWith("/:")) {
      return true;
    }
    return matchingSegment === `/${segment.value}`;
  };

  const getBreadcrumb = (segments: PathSegment[], links = navLinks, parentPath?: string): BreadcrumbSegment[] => {
    const [segment, ...rest] = segments;
    const fullPath = parentPath ? `${parentPath}/${segment.value}` : `/${segment.value}`;
    const navItem = links.find((navLink) => isNavItemMatching(navLink, segment, parentPath));
    if (!navItem) {
      return [];
    }

    const name = navItem.url.includes(":") && segment.label ? segment.label : t(navItem.labelKey);
    if (rest.length === 0) {
      return [{ name, href: fullPath }];
    }
    return [{ name, href: fullPath }].concat(getBreadcrumb(rest, navItem.subLinks || [], fullPath));
  };

  const breadcrumb = getBreadcrumb(path);

  return (
    <div {...props} className={["bg-[#7393B3] rounded-lg p-2 text-white mb-8", className].join(" ")}>
      <h1>{title}</h1>
      <nav>
        <ul className="flex gap-2 text-sm">
          {breadcrumb.map((segment) => (
            <React.Fragment key={segment.href}>
              <li className="duration-200 font-bold hover:brightness-75 last-of-type:text-raimon-blue-dark">
                <a href={segment.href}>{segment.name}</a>
              </li>
              <span className="last-of-type:hidden">{breadcrumb.length > 0 ? " / " : ""}</span>
            </React.Fragment>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Banner;
