import { IconType } from "react-icons";

export interface INavLink {
  href: string;
  label: string;
  icon?: IconType;
  subLinks?: INavLink[];
}

const useNavLinks = () => {
  return [
    { href: "/", label: "Home" },
    {
      href: "/characters",
      label: "Characters",
      subLinks: [{ href: "/characters/add", label: "Add character" }],
    },
    {
      href: "/hissatsus",
      label: "Hissatsus",
      subLinks: [{ href: "/hissatsus/add", label: "Add hissatsu" }],
    },
    { href: "/glossary", label: "Glossary" },
  ] as INavLink[];
};

export default useNavLinks;
