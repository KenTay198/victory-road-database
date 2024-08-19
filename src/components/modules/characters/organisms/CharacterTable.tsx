"use client";
import {
  Archetype,
  ICharacter,
  ICompleteCharacter,
  ICompleteStatistics,
} from "@/types/character.types";
import {
  capitalize,
  getAdvancedStats,
  getArchetypes,
  getTotalStats,
  normalize,
} from "@utils/functions";
import {
  advancedStatisticsLabels,
  archetypes,
  elements,
  positions,
  statisticsLabels,
} from "@utils/variables";
import React, { useEffect, useState } from "react";
import CharacterTableFilters, {
  ICharacterFilters,
} from "../molecules/CharacterTableFilters";
import CharacterTableRow from "../molecules/CharacterTableRow";
import { ISort } from "@/types/types";
import TableHeader, { IHeaderColumn } from "@molecules/TableHeader/TableHeader";
import CharacterAveragesRow from "../molecules/CharacterAveragesRow";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  characters: ICharacter[];
}

function CharacterTable({ characters, className, ...props }: IProps) {
  const [completeCharacters, setCompleteCharacters] = useState<
    ICompleteCharacter[]
  >([]);
  const [sort, setSort] = useState<ISort>({
    key: "total",
    order: "desc",
  });
  const [averages, setAverages] = useState<ICompleteStatistics>({
    kick: 0,
    control: 0,
    pressure: 0,
    physical: 0,
    agility: 0,
    intelligence: 0,
    technique: 0,
    total: 0,
    "total-att": 0,
    "shoot-att": 0,
    "focus-att": 0,
    "scramble-att": 0,
    "total-def": 0,
    "wall-def": 0,
    "focus-def": 0,
    "scramble-def": 0,
    gk: 0,
  });
  const [filteredCharacters, setFilteredCharacters] = useState<
    ICompleteCharacter[]
  >([]);
  const [filters, setFilters] = useState<ICharacterFilters>({
    info: "basic",
    positions: positions,
    elements: elements.filter((e) => e !== "void"),
    archetypes: archetypes,
    query: "",
  });

  const handleChangeSortKey = (key: string, order?: "asc" | "desc") => {
    if (key === sort.key)
      return setSort((old) => ({
        ...old,
        order: order || old.order === "asc" ? "desc" : "asc",
      }));

    return setSort({ key, order: order || "desc" });
  };

  useEffect(() => {
    const { key, order } = sort;

    const chars = Array.from(completeCharacters);

    const { elements, positions, query } = filters;
    setFilteredCharacters(() =>
      chars
        .filter(
          ({ defaultPosition, element, archetypes, firstName, lastName }) => {
            if (query) {
              const name = `${normalize(firstName)}${
                lastName ? " " + normalize(lastName) : ""
              }`;
              if (!name.includes(normalize(query))) return false;
            }
            if (
              !filters.archetypes.some((e) =>
                archetypes.includes(e as Archetype)
              )
            )
              return false;
            if (!elements.includes(element)) return false;
            if (!positions.includes(defaultPosition)) return false;
            return true;
          }
        )
        .sort((a, b) => {
          switch (key) {
            case "total": {
              const aTotal = getTotalStats(a.statistics);
              const bTotal = getTotalStats(b.statistics);

              if (order === "desc") return bTotal - aTotal;
              return aTotal - bTotal;
            }

            case "elements":
              if (order === "desc") return b.element.localeCompare(a.element);
              return a.element.localeCompare(b.element);

            default: {
              if (
                statisticsLabels.includes(key) ||
                advancedStatisticsLabels.includes(key)
              ) {
                const aValue: number = a.statistics[key as keyof object];
                const bValue: number = b.statistics[key as keyof object];
                if (order === "desc") return bValue - aValue;
                return aValue - bValue;
              }

              if (order === "desc")
                return b.firstName.localeCompare(a.firstName);
              return a.firstName.localeCompare(b.firstName);
            }
          }
        })
    );
  }, [sort, completeCharacters, filters]);

  useEffect(() => {
    const completeCharacters: ICompleteCharacter[] = characters.map((c) => {
      const statistics = getAdvancedStats(c.statistics);
      return { ...c, statistics, archetypes: [] };
    });

    const averages: Partial<ICompleteStatistics> = {};

    for (const stat of [...statisticsLabels, ...advancedStatisticsLabels]) {
      const key = stat as keyof ICompleteStatistics;
      const totalValue = completeCharacters.reduce(
        (acc, curr) => acc + curr.statistics?.[key] || 0,
        0
      );
      averages[key] = Math.round(totalValue / completeCharacters.length);
    }

    averages.total = getTotalStats(averages as ICompleteStatistics);

    setAverages(averages as ICompleteStatistics);

    const archetypeCharacters = completeCharacters.map((c) => {
      const archetypes = getArchetypes(
        c.statistics,
        c.hissatsus,
        averages as ICompleteStatistics
      );
      return { ...c, statistics: c.statistics, archetypes };
    });

    setCompleteCharacters(archetypeCharacters);
  }, [characters]);

  const getColumns = () => {
    const columns: IHeaderColumn[] = [
      {
        key: "name",
        width: 150,
        baseOrder: "asc",
        className: "rounded-tl-[9px]",
      },
      { key: "elements" },
      { key: "archetypes", noSorted: true },
    ];

    switch (filters.info) {
      case "basic":
        columns.push(...[...statisticsLabels, "total"].map((key) => ({ key })));
        break;
      case "advanced":
        columns.push(
          ...advancedStatisticsLabels.map((key) => {
            const parts = key.split("-");
            const label =
              parts.length > 1
                ? `${capitalize(parts[0])} ${parts[1].toUpperCase()}`
                : parts[0].toUpperCase();
            return { key, label };
          })
        );
        break;
      case "hissatsus":
        columns.push(
          ...[...Array(2)].map(
            (_e, i) =>
              ({
                key: `hissatsu-${i + 1}`,
                label: `Hissatsu ${i + 1}`,
                noSorted: true,
              } as IHeaderColumn)
          )
        );
        break;

      default:
        break;
    }

    return columns;
  };

  return (
    <>
      <CharacterTableFilters filters={filters} handleChange={setFilters} />
      <div
        {...props}
        className={[
          "relative rounded-lg w-fit shadow",
          "after:border-2 after:rounded-lg after:pointer-events-none after:border-gray-300 after:absolute after:top-0 after:left-0 after:w-full after:h-full",
          className,
        ].join(" ")}
      >
        <table className="text-center">
          <TableHeader
            sort={sort}
            handleChangeSortKey={handleChangeSortKey}
            columns={getColumns()}
          />
          <tbody>
            <CharacterAveragesRow averages={averages} info={filters.info} />
            {filteredCharacters.length > 0 ? (
              filteredCharacters.map((character) => {
                return (
                  <CharacterTableRow
                    key={`character-${character._id}`}
                    character={character}
                    averages={averages}
                    info={filters.info}
                  />
                );
              })
            ) : (
              <tr>
                <td colSpan={100}>No characters</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default CharacterTable;
