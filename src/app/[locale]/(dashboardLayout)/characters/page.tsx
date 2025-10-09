import React from "react";
import { findAllCharactersAction } from "@/actions/character.actions";
import CharacterTable from "@components/character/CharacterTable/CharacterTable";
import Banner from "@components/ui/Layout/Banner";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations("pages.characters.metadata");

  return {
    title: t("title"),
    description: t("description"),
  };
};

const CharactersListPage = async () => {
  const t = await getTranslations("pages.characters");
  const characters = await findAllCharactersAction();

  return (
    <>
      <Banner title={t("header")} path={[{ value: "characters" }]} />
      <CharacterTable className="overflow-x-auto" characters={characters} />
    </>
  );
};

export default CharactersListPage;
