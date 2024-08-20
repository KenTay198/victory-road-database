import { getCharacterById } from "@/controllers/characters.controller";
import BackButton from "@atoms/BackButton";
import Button from "@atoms/Button";
import CharacterView from "@components/modules/characters/organisms/CharacterView";
import React from "react";
import { GrUpdate } from "react-icons/gr";

export const metadata = {
  title: "View character | Victory Road Database",
};

async function ViewCharacterPage({ params }: { params: any }) {
  const character = await getCharacterById(params.id, {
    completeHissatsus: true,
  });

  return (
    <div>
      <BackButton href="/characters" label="Back to characters list" />
      <h1>View character</h1>
      <Button
        color="blue"
        href={`/characters/update/${params.id}`}
        icon={GrUpdate}
        className="mb-2"
      >
        Update character
      </Button>
      {character ? (
        <CharacterView character={character} />
      ) : (
        <p>This character doesn&apos;t exist.</p>
      )}
    </div>
  );
}

export default ViewCharacterPage;
