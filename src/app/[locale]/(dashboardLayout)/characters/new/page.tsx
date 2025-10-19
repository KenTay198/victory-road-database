import Banner from "@components/ui/Layout/Banner";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import CharacterForm from "@components/character/CharacterForm/CharacterForm";
import AdminRoute from "@components/auth/AdminRoute";
import { findAllHissatsusAction } from "@/actions/hissatsu.actions";
import { getPageContext } from "@/actions/page.actions";

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations("pages.characters.new.metadata");

  return {
    title: `${t("title")} | Victory Road Database`,
    description: t("description"),
  };
};

const NewCharacterPage = async () => {
  const t = await getTranslations("pages.characters.new");
  const { settings } = await getPageContext();
  const hissatsus = await findAllHissatsusAction({ locale: settings.hissatsuLocale });

  return (
    <AdminRoute>
      <Banner title={t("header")} path={[{ value: "characters" }, { value: "new" }]} />
      <CharacterForm hissatsus={hissatsus} className="max-w-[1000px]" />
    </AdminRoute>
  );
};

export default NewCharacterPage;
