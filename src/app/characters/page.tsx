import React from "react";
import Button from "@atoms/Button";
import CharacterTable from "@components/modules/characters/organisms/CharacterTable";
import { getCharacters } from "@/controllers/characters.controller";
import { FaPlus } from "react-icons/fa";

async function CharacterListPage() {
  const characters = await getCharacters();

  return (
    <div>
      <h1>Character list</h1>
      <Button color="blue" href="/characters/add" icon={FaPlus} className="mb-2">
        Add character
      </Button>
      <CharacterTable characters={characters} />
    </div>
  );
}

export default CharacterListPage;
