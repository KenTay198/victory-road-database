import React from "react";
import CharacterImage from "../CharacterImage";
import type Character from "@character/entities/character.entity";
import Link from "next/link";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  characters: Character[];
}

const CharacterGrid = ({ className, characters, ...props }: IProps) => {
  return (
    <div {...props} className={["flex flex-wrap gap-5", className].join(" ")}>
      {characters.map((character, index) => (
        <Link key={`character-${character.id}-${index}`} href={`/characters/${character.id}`}>
          <div className="group relative rounded-lg overflow-hidden cursor-pointer">
            <CharacterImage character={character} size="large" className="duration-200 group-hover:scale-110" />
            <div className="absolute bottom-0 left-0 w-full bg-raimon-blue-dark text-white font-bold px-1 text-center py-1 duration-200 group-hover:py-2">
              <p>{character.fullName}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CharacterGrid;
