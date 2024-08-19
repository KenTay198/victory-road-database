import { getCharacterById } from "@/controllers/characters.controller";
import BackButton from "@atoms/BackButton";
import CharacterForm from "@components/modules/characters/organisms/CharacterForm";
import React from "react";

export const metadata = {
  title: "Update character | Victory Road Database",
};

async function UpdateCharacterPage({ params }: { params: any }) {
  const character = await getCharacterById(params.id);

  return (
    <div>
      <BackButton href="/characters" label="Back to characters list" />
      <h1>Update character</h1>
      {character ? (
        <CharacterForm character={character} />
      ) : (
        <p>This character doesn&apos;t exist.</p>
      )}
    </div>
  );
}

export default UpdateCharacterPage;
