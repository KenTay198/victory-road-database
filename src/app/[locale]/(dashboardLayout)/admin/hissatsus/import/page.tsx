import Banner from "@components/ui/Layout/Banner";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ImportHissatsus from "@components/admin/hissatsus/ImportHissatsus";

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations("pages.admin.hissatsus.import.metadata");

  return {
    title: `${t("title")} | Victory Road Database`,
    description: t("description"),
  };
};

const ImportCharacterPage = async () => {
  const t = await getTranslations("pages.admin.hissatsus.import");

  return (
    <>
      <Banner title={t("header")} path={[{ value: "admin" }, { value: "hissatsus" }]} />
      <ImportHissatsus />
    </>
  );
};

export default ImportCharacterPage;
