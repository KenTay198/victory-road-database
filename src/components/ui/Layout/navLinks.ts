import type { IconType } from "react-icons";
import { FaBook, FaCog, FaHome, FaUser, FaUsers } from "react-icons/fa";
import { GiFireDash } from "react-icons/gi";

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
    url: "/hissatsus",
    labelKey: "hissatsus",
    Icon: GiFireDash,
    subLinks: [
      {
        url: "/hissatsus/:id",
        labelKey: "hissatsu",
        Icon: GiFireDash,
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
