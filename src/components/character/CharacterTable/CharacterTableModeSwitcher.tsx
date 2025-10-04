"use client";
import Button from "@components/ui/Buttons/Button";
import { useTranslations } from "next-intl";
import type React from "react";

export type CharacterTableMode = "general" | "advanced";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  mode: CharacterTableMode;
  handleUpdate: (mode: CharacterTableMode) => void;
}

const CharacterTableModeSwitcher = ({ className, mode, handleUpdate, ...props }: IProps) => {
  const t = useTranslations("pages.characters");
  return (
    <div {...props} className={["flex gap-4", className].join(" ")}>
      <Button size="S" template="darkBlue" onClick={() => handleUpdate("general")} active={mode === "general"}>
        {t("buttons.general")}
      </Button>
      <Button size="S" template="darkBlue" onClick={() => handleUpdate("advanced")} active={mode === "advanced"}>
        {t("buttons.advanced")}
      </Button>
    </div>
  );
};

export default CharacterTableModeSwitcher;
