"use client";
import type React from "react";
import { useLocale } from "@/context/LocaleContext";
import { locales } from "@/translations/intl";
import SelectInput from "./Inputs/Select";

const LocaleSwitcher = ({ className, ...props }: React.InputHTMLAttributes<HTMLSelectElement>) => {
  const { locale, updateLocale } = useLocale();

  return (
    <SelectInput
      {...props}
      id={"locale-switcher"}
      className={["!w-10 text-sm", className].join(" ")}
      options={locales.map((loc) => ({ value: loc, label: loc.toUpperCase() }))}
      value={locale}
      handleChange={(value) => updateLocale(value)}
    />
  );
};

export default LocaleSwitcher;
