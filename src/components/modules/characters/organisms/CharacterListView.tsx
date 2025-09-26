"use client";
import React, { useState, useEffect } from "react";
import { ICharacter, ICompleteCharacter } from "@/types/models/character.types";
import { getCompleteCharacters } from "@utils/characters.functions";
import ViewToggle from "../molecules/ViewToggle";
import CharacterTable from "./CharacterTable";
import CharacterGrid from "./CharacterGrid";
import TableFilters, { IFilter } from "@organisms/Table/TableHeader/TableFilters";
import { ICharacterFilters } from "./CharacterTable";
import { normalize, capitalize } from "@utils/functions";
import { positions, elements, archetypes } from "@utils/variables";
import TextInput from "@atoms/Inputs/TextInput";

interface IProps {
  characters: ICharacter[];
}

function CharacterListView({ characters }: IProps) {
  const [view, setView] = useState<"table" | "grid">("table");
  const [completeCharacters, setCompleteCharacters] = useState<ICompleteCharacter[]>([]);
  const [filteredCharacters, setFilteredCharacters] = useState<ICompleteCharacter[]>([]);
  const [filters, setFilters] = useState<ICharacterFilters>({
    info: "basic",
    positions: positions,
    elements: elements.filter((e) => e !== "void"),
    archetypes: archetypes.filter((e) => e !== "void"),
    query: "",
  });

  const filterConfig: IFilter[] = [
    {
      key: "positions",
      type: "checkbox",
      options: positions.map((p) => ({
        value: p,
        label: capitalize(p),
      })),
    },
    {
      key: "elements",
      type: "checkbox",
      options: elements.filter((e) => e !== "void").map((p) => ({ value: p, label: capitalize(p) })),
    },
    {
      key: "archetypes",
      type: "checkbox",
      options: archetypes.filter((e) => e !== "void").map((p) => ({ value: p, label: capitalize(p) })),
    },
  ];

  const filterCharacters = (datas: ICompleteCharacter[], filterValues: ICharacterFilters) => {
    const { elements, positions, query } = filterValues;
    return datas.filter(({ defaultPosition, element, archetypes, firstName, lastName }) => {
      if (query) {
        const name = `${normalize(firstName)}${lastName ? " " + normalize(lastName) : ""}`;
        if (!name.includes(normalize(query))) return false;
      }
      if (filterValues.archetypes && !filterValues.archetypes.some((e) => archetypes.includes(e as any))) return false;
      if (elements && !elements.includes(element)) return false;
      if (positions && !positions.includes(defaultPosition)) return false;
      return true;
    });
  };

  useEffect(() => {
    const { characters: chars } = getCompleteCharacters(characters);
    setCompleteCharacters(chars);
  }, [characters]);

  useEffect(() => {
    const filtered = filterCharacters(completeCharacters, filters);
    setFilteredCharacters(filtered);
  }, [completeCharacters, filters]);

  const handleFilterChange = (newFilters: Partial<ICharacterFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6"></div>

      <div className="flex gap-3 items-center w-full">
        <TableFilters
          value={filters}
          handleChange={handleFilterChange}
          query={filters.query}
          handleChangeQuery={(query) => handleFilterChange({ query })}
          itemName="character"
          filters={filterConfig}
        />
        <ViewToggle currentView={view} onViewChange={setView} />
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Showing {filteredCharacters.length} of {completeCharacters.length} characters
        </p>
      </div>

      {view === "table" ? (
        <CharacterTable characters={characters.filter((char) => filteredCharacters.some((f) => f._id === char._id))} />
      ) : (
        <CharacterGrid characters={filteredCharacters} />
      )}
    </div>
  );
}

export default CharacterListView;
