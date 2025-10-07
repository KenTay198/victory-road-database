import React, { cache } from "react";
import CharacterView from "@components/character/CharacterView";
import Header from "@components/ui/Layout/Header";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { findCharacterByIdAction } from "@/actions/character.actions";
import { getSettingsAction } from "@/actions/settings.actions";
import Character from "@character/entities/character.entity";

const getCharacter = cache(async (id: string) => {
  return await findCharacterByIdAction(id);
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
  const characterEntity = Character.fromFullJSON(character);
  const settings = await getSettingsAction();
  characterEntity.setLocalizedName(settings.characterLocale);

  return (
    <>
      <Header
        title={characterEntity.fullName}
        path={[{ value: "characters" }, { value: id, label: characterEntity.fullName }]}
      />
      <CharacterView character={characterEntity} className="ml-4" />
    </>
  );
};

export default CharacterPage;
