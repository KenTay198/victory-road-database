import Banner from "@components/ui/Layout/Banner";
import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import SettingsForm from "@components/settings/SettingsForm";

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations("pages.settings.metadata");

  return {
    title: `${t("title")} | Victory Road Database`,
    description: t("description"),
  };
};

const SettingsPage = () => {
  const t = useTranslations("pages.settings");
  return (
    <>
      <Banner title={t("header")} path={[{ value: "settings" }]} />
      <SettingsForm />
    </>
  );
};

export default SettingsPage;
