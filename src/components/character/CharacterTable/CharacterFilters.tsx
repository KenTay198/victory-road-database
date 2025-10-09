"use client";
import React, { useEffect, useState } from "react";
import ItemTableFilter, { type ItemTableFilterProperty } from "@components/ui/ItemTable/ItemTableFilter";
import { elements } from "@domain/shared/variables";
import { useTranslations } from "next-intl";
import type { CharacterArchetype, ICharacter } from "@character/character.types";
import { archetypes, positions } from "@character/character.variables";

type CharacterFiltersValue = {
  elements: string[];
  defaultPositions: string[];
  archetypes: string[];
};

interface IProps {
  items: ICharacter[];
  onFilterChange: (characters: ICharacter[]) => void;
}

const CharacterFilters = ({ items: characters, onFilterChange }: IProps) => {
  const [filters, setFilters] = useState<CharacterFiltersValue>({
    elements: [],
    defaultPositions: [],
    archetypes: [],
  });
  const t = useTranslations();
  const properties: ItemTableFilterProperty[] = [
    {
      slug: "elements",
      title: t("character.properties.element"),
      options: elements.map((el) => ({ value: el, label: t(`elements.${el}`) })),
      isMultiple: true,
    },
    {
      slug: "defaultPositions",
      title: t("character.properties.defaultPosition"),
      options: positions.map((p) => ({ value: p, label: t(`character.positions.${p}`) })),
      isMultiple: true,
    },
    {
      slug: "archetypes",
      title: t("character.properties.archetypes"),
      options: archetypes.map((a) => ({ value: a, label: t(`character.archetypes.${a}`) })),
      isMultiple: true,
    },
  ];

  useEffect(() => {
    const filteredCharacters = characters.filter((h) => {
      const matchesElement = filters.elements.length === 0 || filters.elements.includes(h.element);
      const matchesPosition =
        filters.defaultPositions.length === 0 || filters.defaultPositions.includes(h.defaultPosition);
      const matchesArchetype =
        filters.archetypes.length === 0 ||
        filters.archetypes.some((a) => h.archetypes.includes(a as CharacterArchetype));
      return matchesElement && matchesPosition && matchesArchetype;
    });

    onFilterChange(filteredCharacters);
  }, [filters]);

  return <ItemTableFilter id="character" properties={properties} filters={filters} onFilterChange={setFilters} />;
};

export default CharacterFilters;
