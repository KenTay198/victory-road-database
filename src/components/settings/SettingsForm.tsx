"use client";
import type React from "react";
import { useState } from "react";
import Button from "@components/ui/Buttons/Button";
import SelectInput from "@components/ui/Inputs/SelectInput";
import { useSettings } from "@context/SettingsContext";
import type { ISettings } from "@settings/settings.types";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

const SettingsForm = ({ className, ...props }: React.HTMLAttributes<HTMLFormElement>) => {
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
    <form {...props} className={["space-y-4", className].join(" ")}>
      <SelectInput
        id="characterLocale"
        label={t("pages.settings.inputs.characterLocale.label")}
        description={t("pages.settings.inputs.characterLocale.description")}
        value={settingsToUpdate.characterLocale}
        options={[
          { value: "west", label: t("common.locales.west") },
          { value: "vo", label: t("common.locales.vo") },
        ]}
        handleChange={(value) => handleChange("characterLocale", value)}
      />
      <SelectInput
        id="hissatsuLocale"
        label={t("pages.settings.inputs.hissatsuLocale.label")}
        description={t("pages.settings.inputs.hissatsuLocale.description")}
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
    </form>
  );
};

export default SettingsForm;
