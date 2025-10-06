"use client";
import React, { useState } from "react";
import IconButton from "@components/ui/Buttons/IconButton";
import LocaleSwitcher from "@components/ui/LocaleSwitcher";
import Logo from "@images/logos/victory-road-logo.png";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Navbar from "./Navbar";
import { bottomNavLinks, navLinks } from "./navLinks";

const Sidebar = () => {
  const [expanded, setExpanded] = useState(false);
  const t = useTranslations("layout.sidebar");

  return (
    <aside className="w-full max-w-[250px] h-screen p-2 z-10 max-laptop:max-w-16">
      <div
        className={`
        relative max-laptop:fixed p-2 rounded-lg h-full bg-raimon-yellow flex flex-col gap-4 items-center justify-between
        ${expanded ? "max-laptop:w-[calc(100%-16px)]" : "max-laptop:w-12"}`}
      >
        <Image src={Logo} alt={t("images.logoAlt")} className="w-4/5 max-w-[200px]" />

        <div className="flex flex-col w-full flex-1 border-y border-raimon-yellow-dark">
          <Navbar links={navLinks} className="flex-1" />

          <Navbar links={bottomNavLinks} />
        </div>

        <div className="flex justify-between w-4/5 py-2">
          <UserCard expanded={expanded} />
          <LocaleSwitcher className={` ${expanded ? "" : "max-laptop:hidden"}`} />
        </div>

        <ToggleButton expanded={expanded} setExpanded={setExpanded} />
      </div>
    </aside>
  );
};

const ToggleButton = ({ expanded, setExpanded }: { expanded: boolean; setExpanded: (value: boolean) => void }) => {
  const Icon = expanded ? FaChevronLeft : FaChevronRight;
  return (
    <IconButton
      className={`absolute top-4 right-0 rounded-full !px-1 !py-1 laptop:hidden ${
        expanded ? "max-laptop:rounded-r-none" : "max-laptop:translate-x-1/2"
      }`}
      title="Toggle Sidebar"
      template="blue"
      size="S"
      Icon={Icon}
      onClick={() => setExpanded(!expanded)}
    />
  );
};

const UserCard = ({ expanded }: { expanded: boolean }) => {
  return (
    <div className="flex items-center space-x-2">
      <div className="w-7 h-7 bg-gray-500 rounded-full"></div>
      <div className={`${expanded ? "" : "max-laptop:hidden"}`}>
        <p>Guest</p>
      </div>
    </div>
  );
};

export default Sidebar;
