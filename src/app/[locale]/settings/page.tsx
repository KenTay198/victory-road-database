import React from "react";
import Header from "@components/ui/Layout/Header";
import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import SettingsForm from "@components/settings/SettingsForm";

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations("pages.settings.metadata");

  return {
    title: t("title"),
    description: t("description"),
  };
};

const SettingsPage = () => {
  const t = useTranslations("pages.settings");
  return (
    <>
      <Header title={t("header")} path={[{ value: "settings" }]} />
      <SettingsForm />
    </>
  );
};

export default SettingsPage;
