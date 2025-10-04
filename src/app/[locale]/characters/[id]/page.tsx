import React, { cache } from "react";
import FindCharacterById from "@character/usecases/FindCharacterById";
import CharacterView from "@components/character/CharacterView";
import Header from "@components/ui/Layout/Header";
import { settingsServiceInstance } from "@utils/repository-instances";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import GetSettings from "@settings/usecases/GetSettings";
import { getServices } from "@/actions/services";

const getCharacter = cache(async (id: string) => {
  const { characterService, metaService, hissatsuService } = await getServices();
  return await new FindCharacterById(characterService, metaService, hissatsuService).execute(id);
});

export const generateMetadata = async ({ params }: any): Promise<Metadata> => {
  const t = await getTranslations("pages.characters.pages.character.metadata");
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

const CharacterPage = async ({ params }: any) => {
  const { id } = await params;
  const character = await getCharacter(id);
  if (!character) {
    return notFound();
  }
  const { settingsService } = await getServices();
  const settings = await new GetSettings(settingsService).execute();
  character.setLocalizedName(settings.characterLocale);

  return (
    <>
      <Header title={character.fullName} path={[{ value: "characters" }, { value: id, label: character.fullName }]} />
      <CharacterView character={character} className="ml-4" />
    </>
  );
};

export default CharacterPage;
