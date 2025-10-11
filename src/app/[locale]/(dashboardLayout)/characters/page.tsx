import { findAllCharactersAction } from "@/actions/character.actions";
import CharacterTable from "@components/character/CharacterTable/CharacterTable";
import Banner from "@components/ui/Layout/Banner";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Button from "@components/ui/Buttons/Button";
import { getCurrentUserAction } from "@/actions/auth.actions";
import { IoMdPersonAdd } from "react-icons/io";

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
  const user = await getCurrentUserAction();

  return (
    <>
      <Banner title={t("header")} path={[{ value: "characters" }]} />
      {user?.role === "admin" && (
        <Button template="blue" link="/characters/new" className="mb-8 flex gap-2 items-center">
          <IoMdPersonAdd size={20} />
          {t("actions.add")}
        </Button>
      )}
      <CharacterTable className="overflow-x-auto" characters={characters} />
    </>
  );
};

export default CharactersListPage;
