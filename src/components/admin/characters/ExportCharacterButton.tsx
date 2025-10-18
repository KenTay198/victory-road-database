"use client";
import { findAllCharactersAction } from "@/actions/character.actions";
import type { ICreateLearnedHissatsu, IHissatsu } from "@hissatsu/hissatsu.types";
import ExportEntitiesButton from "../common/ExportEntitiesButton";
import type { IFullCharacter } from "@character/character.types";

const ExportCharacterButton = ({ className, ...props }: React.HTMLAttributes<HTMLButtonElement>) => {
  const transformFunction = (e: IFullCharacter) => {
    const character: any = { ...e };
    delete character.id;
    delete character.archetypes;
    const learnedHissatsus: ICreateLearnedHissatsu[] = character.learnedHissatsus || [];
    const hissatsus: IHissatsu[] = character.hissatsus || [];
    if (learnedHissatsus.length > 0 && hissatsus.length > 0) {
      for (let i = 0; i < learnedHissatsus.length; i++) {
        const h = learnedHissatsus[i];
        const fullHissatsu = hissatsus.find((hh) => hh.id === h.id);
        if (!fullHissatsu) continue;
        learnedHissatsus[i] = { ...fullHissatsu, learnLevel: h.learnLevel };
        delete learnedHissatsus[i].id;
      }
    }
    delete character.hissatsus;
    return character;
  };

  return (
    <ExportEntitiesButton<IFullCharacter>
      {...props}
      findAllFunction={() => findAllCharactersAction({ withMeta: false, withHissatsus: true })}
      transformFunction={transformFunction}
      fileName="characters_export"
    />
  );
};

export default ExportCharacterButton;
