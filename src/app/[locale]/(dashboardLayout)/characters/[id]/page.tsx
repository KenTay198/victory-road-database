import { cache } from "react";
import CharacterView from "@components/character/CharacterView";
import Banner from "@components/ui/Layout/Banner";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { findCharacterByIdAction } from "@/actions/character.actions";
import Character from "@character/entities/character.entity";
import Button from "@components/ui/Buttons/Button";
import { GrUpdate } from "react-icons/gr";
import { getPageContext } from "@/actions/page.actions";
import type { IFindCharactersParams } from "@character/character.types";

const getCharacter = cache(async (id: string, params?: IFindCharactersParams) => {
  return await findCharacterByIdAction(id, params);
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
  const { user, settings } = await getPageContext();
  const character = await getCharacter(id, { locale: settings.characterLocale });
  if (!character) {
    return notFound();
  }

  const characterEntity = Character.fromFullJSON(character);

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
