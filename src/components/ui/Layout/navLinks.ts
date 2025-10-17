import type { IconType } from "react-icons";
import { FaBook, FaCog, FaHome, FaUser, FaUsers } from "react-icons/fa";
import { GiFireDash } from "react-icons/gi";
import { IoMdPersonAdd } from "react-icons/io";
import { RiAdminFill } from "react-icons/ri";

export interface INavLink {
  url: string;
  Icon: IconType;
  labelKey: string;
  subLinks?: INavLink[];
  hidden?: boolean;
  isAdmin?: boolean;
}

export const navLinks: INavLink[] = [
  {
    url: "/",
    labelKey: "home",
    Icon: FaHome,
  },
  {
    url: "/admin",
    labelKey: "admin.label",
    Icon: RiAdminFill,
    isAdmin: true,
    subLinks: [
      {
        url: "/admin/characters",
        labelKey: "admin.characters.label",
        Icon: FaUsers,
        subLinks: [
          {
            url: "/admin/characters/import",
            labelKey: "admin.characters.import",
            Icon: FaUsers,
          },
        ],
      },
    ],
  },
  {
    url: "/characters",
    labelKey: "characters",
    Icon: FaUsers,
    subLinks: [
      {
        url: "/characters/new",
        labelKey: "newCharacter",
        Icon: IoMdPersonAdd,
        isAdmin: true,
      },
      {
        url: "/characters/:id",
        labelKey: "character",
        Icon: FaUser,
        hidden: true,
        subLinks: [
          {
            url: "/characters/:id/update",
            labelKey: "updateCharacter",
            Icon: IoMdPersonAdd,
            hidden: true,
            isAdmin: true,
          },
        ],
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
