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
  const t = useTranslations("");

  return (
    <>
      <h1>{t("pages.home.header")}</h1>
      <Button template="blue" link="/characters">
        {t("pages.home.buttons.seeCharacters")}
      </Button>
    </>
  );
}
