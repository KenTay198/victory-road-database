import Button from "@components/ui/Buttons/Button";
import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations("pages.home.metadata");

  return {
    title: t("title"),
    description: t("description"),
  };
};

export default function Home() {
  const t = useTranslations("pages.home");

  return (
    <>
      <h1>{t("header")}</h1>
      <Button template="blue" link="/characters">
        {t("buttons.seeCharacters")}
      </Button>
    </>
  );
}
