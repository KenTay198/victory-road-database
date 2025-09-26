import React from "react";
import { ICompleteCharacter } from "@/types/models/character.types";
import CharacterCard from "../molecules/CharacterCard";

interface IProps {
  characters: ICompleteCharacter[];
}

function CharacterGrid({ characters }: IProps) {
  if (characters.length === 0) {
    return (
      <div className="flex items-center justify-center h-40 text-gray-500 dark:text-gray-400">
        <p>No characters found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-4 justify-start">
      {characters.map((character) => (
        <CharacterCard key={character._id} character={character} />
      ))}
    </div>
  );
}

export default CharacterGrid;
