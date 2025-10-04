import type { IconType } from "react-icons";
import { FaBook, FaCog, FaHome, FaUser, FaUsers } from "react-icons/fa";

export interface INavLink {
  url: string;
  Icon: IconType;
  labelKey: string;
  subLinks?: INavLink[];
  hidden?: boolean;
}

export const navLinks: INavLink[] = [
  {
    url: "/",
    labelKey: "home",
    Icon: FaHome,
  },
  {
    url: "/characters",
    labelKey: "characters",
    Icon: FaUsers,
    subLinks: [
      {
        url: "/characters/:id",
        labelKey: "character",
        Icon: FaUser,
        hidden: true,
      },
    ],
  },
  {
    url: "/glossary",
    labelKey: "glossary",
    Icon: FaBook,
  },
];

export const bottomNavLinks: INavLink[] = [
  {
    url: "/settings",
    labelKey: "settings",
    Icon: FaCog,
  },
];
