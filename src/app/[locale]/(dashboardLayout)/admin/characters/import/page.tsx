import Banner from "@components/ui/Layout/Banner";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ImportCharacters from "@components/admin/characters/ImportCharacters";

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations("pages.admin.characters.import.metadata");

  return {
    title: `${t("title")} | Victory Road Database`,
    description: t("description"),
  };
};

const ImportCharacterPage = async () => {
  const t = await getTranslations("pages.admin.characters.import");

  return (
    <>
      <Banner title={t("header")} path={[{ value: "admin" }, { value: "characters" }]} />
      <ImportCharacters />
    </>
  );
};

export default ImportCharacterPage;
