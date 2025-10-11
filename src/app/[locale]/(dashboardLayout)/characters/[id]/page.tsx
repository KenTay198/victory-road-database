import React, { cache } from "react";
import CharacterView from "@components/character/CharacterView";
import Banner from "@components/ui/Layout/Banner";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { findCharacterByIdAction } from "@/actions/character.actions";
import { getSettingsAction } from "@/actions/settings.actions";
import Character from "@character/entities/character.entity";
import { getCurrentUserAction } from "@/actions/auth.actions";
import Button from "@components/ui/Buttons/Button";
import { GrUpdate } from "react-icons/gr";

const getCharacter = cache(async (id: string) => {
  return await findCharacterByIdAction(id);
});

export const generateMetadata = async ({ params }: any): Promise<Metadata> => {
  const t = await getTranslations("pages.characters.character.metadata");
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
  const t = await getTranslations("pages.characters.character");
  const { id } = await params;
  const character = await getCharacter(id);
  if (!character) {
    return notFound();
  }
  console.log(character);

  const characterEntity = Character.fromFullJSON(character);
  const settings = await getSettingsAction();
  characterEntity.setLocalizedName(settings.characterLocale);
  const user = await getCurrentUserAction();

  return (
    <>
      <Banner
        title={characterEntity.fullName}
        path={[{ value: "characters" }, { value: id, label: characterEntity.fullName }]}
      />
      {user?.role === "admin" && (
        <Button template="blue" link={`/characters/${id}/update`} className="mb-8 flex gap-2 items-center">
          <GrUpdate size={18} />
          {t("actions.update")}
        </Button>
      )}
      <CharacterView character={characterEntity} className="ml-4" />
    </>
  );
};

export default CharacterPage;
