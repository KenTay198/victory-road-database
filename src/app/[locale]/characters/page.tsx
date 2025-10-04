import FindAllCharacters from "@character/usecases/FindAllCharacters";
import CharacterTable from "@components/character/CharacterTable/CharacterTable";
import Header from "@components/ui/Layout/Header";
import { characterServiceInstance, hissatsuServiceInstance, metaServiceInstance } from "@utils/repository-instances";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import React from "react";

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations("pages.characters.metadata");

  return {
    title: t("title"),
    description: t("description"),
  };
};

const CharactersListPage = async () => {
  const t = await getTranslations("pages.characters");
  const characters = await new FindAllCharacters(
    characterServiceInstance,
    metaServiceInstance,
    hissatsuServiceInstance,
  ).execute();

  return (
    <>
      <Header title={t("header")} path={[{ value: "characters" }]} />
      <CharacterTable className="overflow-x-auto" characters={characters.map((c) => c.toJSON())} />
    </>
  );
};

export default CharactersListPage;
