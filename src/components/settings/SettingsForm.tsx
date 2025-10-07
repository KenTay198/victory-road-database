"use client";
import type React from "react";
import { useState } from "react";
import Button from "@components/ui/Buttons/Button";
import SelectInput from "@components/ui/Inputs/SelectInput";
import { useSettings } from "@context/SettingsContext";
import type { ISettings } from "@settings/settings.types";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

const SettingsForm = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  const t = useTranslations();
  const { settings, updateSettings } = useSettings();
  const [isDirty, setIsDirty] = useState(false);
  const [settingsToUpdate, setSettingsToUpdate] = useState<ISettings>(settings.toJSON());

  const handleSubmit = () => {
    toast.promise<boolean>(updateSettings(settingsToUpdate), {
      success: t("pages.settings.toasts.update.success"),
      loading: t("pages.settings.toasts.update.loading"),
      error: t("pages.settings.toasts.update.error"),
    });
    setIsDirty(false);
  };

  const handleChange = (property: keyof ISettings, value: any) => {
    setSettingsToUpdate({
      ...settingsToUpdate,
      [property]: value,
    });
    setIsDirty(true);
  };

  return (
    <div {...props} className={["space-y-4", className].join(" ")}>
      <SelectInput
        id="characterLocale"
        label="Character Language"
        description="Select the default language displayed for Characters"
        value={settingsToUpdate.characterLocale}
        options={[
          { value: "fr", label: t("common.locales.fr") },
          { value: "vo", label: t("common.locales.vo") },
        ]}
        handleChange={(value) => handleChange("characterLocale", value)}
      />
      <SelectInput
        id="hissatsuLocale"
        label="Hissatsu Language"
        description="Select the default language displayed for Hissatsus"
        value={settingsToUpdate.hissatsuLocale}
        options={[
          { value: "en", label: t("common.locales.en") },
          { value: "fr", label: t("common.locales.fr") },
          { value: "jp", label: t("common.locales.jp") },
        ]}
        handleChange={(value) => handleChange("hissatsuLocale", value)}
      />
      <Button template="darkBlue" size="M" onClick={() => handleSubmit()} disabled={!isDirty}>
        {t("common.buttons.submit")}
      </Button>
    </div>
  );
};

export default SettingsForm;
