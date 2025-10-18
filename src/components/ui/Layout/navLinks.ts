import type { IconType } from "react-icons";
import { FaBook, FaChartBar, FaCog, FaHome, FaUser, FaUsers } from "react-icons/fa";
import { GiFireDash } from "react-icons/gi";
import { IoMdPersonAdd } from "react-icons/io";
import { LuImport } from "react-icons/lu";
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
        url: "/hissatsus/new",
        labelKey: "newHissatsu",
        Icon: IoMdPersonAdd,
        isAdmin: true,
      },
      {
        url: "/hissatsus/:id",
        labelKey: "hissatsu",
        Icon: GiFireDash,
        hidden: true,
        subLinks: [
          {
            url: "/hissatsus/:id/update",
            labelKey: "updateHissatsu",
            Icon: IoMdPersonAdd,
            hidden: true,
            isAdmin: true,
          },
        ],
      },
    ],
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
            Icon: LuImport,
          },
        ],
      },
      {
        url: "/admin/hissatsus",
        labelKey: "admin.hissatsus.label",
        Icon: GiFireDash,
        subLinks: [
          {
            url: "/admin/hissatsus/import",
            labelKey: "admin.hissatsus.import",
            Icon: LuImport,
          },
        ],
      },
      {
        url: "/admin/meta",
        labelKey: "admin.meta",
        Icon: FaChartBar,
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
