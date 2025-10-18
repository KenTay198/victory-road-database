"use client";
import Button from "@components/ui/Buttons/Button";
import IconButton from "@components/ui/Buttons/IconButton";
import CheckboxInput from "@components/ui/Inputs/CheckboxInput";
import { useTranslations } from "next-intl";
import type React from "react";
import { FaTable } from "react-icons/fa";
import { IoGrid } from "react-icons/io5";

export type CharacterTableOptions = {
  display: CharacterTableDisplay;
  mode: CharacterTableMode;
  normalize: boolean;
};

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  options: CharacterTableOptions;
  onChangeOptions: (options: CharacterTableOptions) => void;
}

const CharacterActionBar = ({ className, options, onChangeOptions, ...props }: IProps) => {
  return (
    <div {...props} className={["flex flex-wrap justify-between gap-4", className].join(" ")}>
      {options.display === "table" ? (
        <ModeSwitcher
          mode={options.mode}
          onChangeMode={(newMode) => onChangeOptions({ ...options, mode: newMode })}
          normalize={options.normalize}
          onChangeNormalize={(newNormalize) => onChangeOptions({ ...options, normalize: newNormalize })}
        />
      ) : (
        <div />
      )}
      <DisplaySwitcher
        display={options.display}
        onChangeDisplay={(newDisplay) => onChangeOptions({ ...options, display: newDisplay })}
      />
    </div>
  );
};

export type CharacterTableDisplay = "table" | "grid";

interface IDisplayProps extends React.HTMLAttributes<HTMLDivElement> {
  display: CharacterTableDisplay;
  onChangeDisplay: (display: CharacterTableDisplay) => void;
}

const DisplaySwitcher = ({ className, display, onChangeDisplay, ...props }: IDisplayProps) => {
  const t = useTranslations("pages.characters");
  return (
    <div {...props} className={["flex gap-2", className].join(" ")}>
      <div>
        <IconButton
          title={t("buttons.display.table")}
          Icon={FaTable}
          size="S"
          template="darkBlue"
          onClick={() => onChangeDisplay("table")}
          active={display === "table"}
        />
      </div>
      <div>
        <IconButton
          title={t("buttons.display.grid")}
          Icon={IoGrid}
          size="S"
          template="darkBlue"
          onClick={() => onChangeDisplay("grid")}
          active={display === "grid"}
        />
      </div>
    </div>
  );
};

export type CharacterTableMode = "general" | "advanced" | "hissatsu";

interface IModeProps extends React.HTMLAttributes<HTMLDivElement> {
  mode: CharacterTableMode;
  onChangeMode: (mode: CharacterTableMode) => void;
  normalize: boolean;
  onChangeNormalize: (normalize: boolean) => void;
}

const ModeSwitcher = ({ className, mode, onChangeMode, normalize, onChangeNormalize, ...props }: IModeProps) => {
  const t = useTranslations("pages.characters");
  return (
    <div className="space-y-1">
      <div {...props} className={["flex gap-4", className].join(" ")}>
        <Button size="S" template="darkBlue" onClick={() => onChangeMode("general")} active={mode === "general"}>
          {t("buttons.mode.general")}
        </Button>
        <Button size="S" template="darkBlue" onClick={() => onChangeMode("advanced")} active={mode === "advanced"}>
          {t("buttons.mode.advanced")}
        </Button>
        <Button size="S" template="darkBlue" onClick={() => onChangeMode("hissatsu")} active={mode === "hissatsu"}>
          {t("buttons.mode.hissatsu")}
        </Button>
      </div>
      {mode !== "hissatsu" && (
        <CheckboxInput
          gap={3}
          id="normalize"
          label="Normalise stats ?"
          checked={normalize}
          handleChange={onChangeNormalize}
        />
      )}
    </div>
  );
};

export default CharacterActionBar;
