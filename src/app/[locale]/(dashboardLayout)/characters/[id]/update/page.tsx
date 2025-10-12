import { cache } from "react";
import Banner from "@components/ui/Layout/Banner";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import CharacterForm from "@components/character/CharacterForm/CharacterForm";
import AdminRoute from "@components/auth/AdminRoute";
import { findCharacterByIdAction } from "@/actions/character.actions";
import { notFound } from "next/navigation";
import { findAllHissatsusAction } from "@/actions/hissatsu.actions";
import type { IDefaultFindCharacterParams } from "@character/character.types";
import { getPageContext } from "@/actions/page.actions";

const getCharacter = cache(async (id: string, params?: IDefaultFindCharacterParams) => {
  return await findCharacterByIdAction(id, params);
});

export const generateMetadata = async ({ params }: any): Promise<Metadata> => {
  const t = await getTranslations("pages.characters.character.update.metadata");
  const { id } = await params;
  const character = await getCharacter(id);
  if (!character) {
    return notFound();
  }

  return {
    title: t("title", { CharacterName: character.fullName }),
    description: t("description", { CharacterName: character.fullName }),
  };
};

const UpdateCharacterPage = async ({ params }: any) => {
  const { id } = await params;
  const { settings } = await getPageContext();
  const character = await getCharacter(id, { locale: settings.characterLocale });
  if (!character) {
    return notFound();
  }
  const hissatsus = await findAllHissatsusAction({ locale: settings.hissatsuLocale });

  return (
    <AdminRoute>
      <Banner
        title={character.fullName}
        path={[{ value: "characters" }, { value: id, label: character.fullName }, { value: "update" }]}
      />
      <CharacterForm character={character} hissatsus={hissatsus} className="max-w-[1000px] mx-auto" />
    </AdminRoute>
  );
};

export default UpdateCharacterPage;
