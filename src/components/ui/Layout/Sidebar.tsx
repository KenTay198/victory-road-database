"use client";
import { useState } from "react";
import IconButton from "@components/ui/Buttons/IconButton";
import { FaBars, FaTimes } from "react-icons/fa";
import Navbar from "./Navbar";
import { bottomNavLinks, navLinks } from "./navLinks";
import Image from "next/image";
import Logo from "@images/logos/victory-road-logo.png";
import { useTranslations } from "next-intl";

const Sidebar = () => {
  const [expanded, setExpanded] = useState(false);
  const t = useTranslations();

  return (
    <aside className="w-full max-w-[250px] h-screen p-2 z-10 max-laptop:max-w-16">
      <div
        className={`
        relative max-laptop:fixed py-8 px-4 rounded-lg h-full bg-raimon-yellow flex flex-col gap-4 items-center justify-between
        ${expanded ? "max-laptop:w-[calc(100%-16px)]" : "max-laptop:w-12 max-laptop:px-2"}`}
      >
        <div className="h-full text-center max-h-[150px]">
          <ToggleButton expanded={expanded} setExpanded={setExpanded} />
          <Image
            src={Logo}
            alt={t("common.images.logoAlt")}
            className={`w-fit h-full ${expanded ? "" : "max-laptop:invisible"}`}
          />
        </div>

        <div className="flex flex-col w-full flex-1 ">
          <Navbar links={navLinks} className="flex-1 border-t border-raimon-yellow-dark" expanded={expanded} />

          <Navbar links={bottomNavLinks} className="border-t border-raimon-yellow-dark" expanded={expanded} />
        </div>
      </div>
    </aside>
  );
};

const ToggleButton = ({ expanded, setExpanded }: { expanded: boolean; setExpanded: (value: boolean) => void }) => {
  const Icon = expanded ? FaTimes : FaBars;
  return (
    <IconButton
      className={`top-4 right-0 rounded-full !px-1 !py-1 laptop:hidden !duration-0 ${
        expanded ? "absolute max-laptop:rounded-r-none" : ""
      }`}
      title="Toggle Sidebar"
      template="blue"
      size="S"
      Icon={Icon}
      onClick={() => setExpanded(!expanded)}
    />
  );
};

export default Sidebar;
