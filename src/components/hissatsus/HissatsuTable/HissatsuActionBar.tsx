"use client";
import Button from "@components/ui/Buttons/Button";
import { useTranslations } from "next-intl";
import type React from "react";
import { FaPlus } from "react-icons/fa";
import { useAuth } from "@context/AuthContext";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {}

const HissatsuActionBar = ({ className, ...props }: IProps) => {
  const t = useTranslations("pages.hissatsus");
  const { user } = useAuth();

  return (
    <div {...props} className={["flex justify-end", className].join(" ")}>
      {user?.role === "admin" && (
        <Button template="blue" link="/hissatsus/new" className="flex gap-2 items-center">
          <FaPlus size={16} />
          {t("actions.add")}
        </Button>
      )}
    </div>
  );
};

export default HissatsuActionBar;
