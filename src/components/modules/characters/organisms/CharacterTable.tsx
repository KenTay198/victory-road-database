"use client";
import {
  Archetype,
  ICharacter,
  ICharacterHissatsu,
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
  archetypesDatas,
  elementDatas,
  elements,
  hissatsuTypeDatas,
  positions,
  statisticsLabels,
} from "@utils/variables";
import React, { useEffect, useState } from "react";
import Table from "@organisms/Table/Table";
import { deleteCharacter } from "@/controllers/characters.controller";
import Link from "next/link";
import { IHeaderColumn } from "@organisms/Table/TableHeader/TableHeader";

export interface ICharacterFilters {
  info: "basic" | "advanced" | "hissatsus";
  positions: string[];
  elements: string[];
  archetypes: string[];
  query: string;
}

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  characters: ICharacter[];
}

function CharacterTable({ characters, ...props }: IProps) {
  const [completeCharacters, setCompleteCharacters] = useState<
    ICompleteCharacter[]
  >([]);
  const [averages, setAverages] = useState<Record<string, number>>({
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

  useEffect(() => {
    const completeCharacters: ICompleteCharacter[] = characters.map((c) => {
      const statistics = getAdvancedStats(c.statistics);
      return {
        ...c,
        name: `${c.firstName}${c.lastName ? " " + c.lastName : ""}`,
        statistics,
        archetypes: [],
      };
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

    setAverages(averages);

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
        type: "string",
        averageLabel: true,
      },
      {
        key: "element",
        type: "string",
        imageObject: { key: "image", object: elementDatas },
      },
      {
        key: "archetypes",
        type: "array",
        noSorted: true,
        displayFunction: (archetypes: Archetype[]) => {
          return (
            <div title={archetypes.join("/")}>
              {archetypes.map((e) => archetypesDatas[e].label).join("/")}
            </div>
          );
        },
      },
    ];

    columns.push(
      ...[...statisticsLabels, "total"].map(
        (key) =>
          ({
            key,
            type: "number",
            parent: { key: "statistics" },
            tab: "basic",
            withAverage: true,
          } as IHeaderColumn)
      )
    );

    columns.push(
      ...advancedStatisticsLabels.map((key) => {
        const parts = key.split("-");
        const label =
          parts.length > 1
            ? `${capitalize(parts[0])} ${parts[1].toUpperCase()}`
            : parts[0].toUpperCase();
        return {
          key,
          label,
          type: "number",
          parent: { key: "statistics" },
          tab: "advanced",
          withAverage: true,
        } as IHeaderColumn;
      })
    );

    columns.push(
      ...[...Array(2)].map(
        (_e, i) =>
          ({
            key: `hissatsu-${i + 1}`,
            label: `Hissatsu ${i + 1}`,
            noSorted: true,
            type: "string",
            tab: "hissatsus",
            parent: { key: "hissatsus", index: i },
            displayFunction: ({
              hissatsuId,
              learnLevel,
            }: ICharacterHissatsu) => {
              const data =
                typeof hissatsuId === "object" ? hissatsuId : undefined;
              const label = data
                ? `${hissatsuTypeDatas[data.type].label} - ${
                    data.name
                  } (lvl. ${learnLevel})`
                : "Inconnu";
              const element =
                elementDatas[(data?.element || "") as keyof object];
              const href = `https://inazuma-eleven.fandom.com/fr/wiki/${
                data?.name.replace(" ", "_") || ""
              }`;

              return (
                <Link
                  style={{
                    color: element?.color,
                  }}
                  href={href}
                  target="_blank"
                  className="font-semibold"
                >
                  {label}
                </Link>
              );
            },
          } as IHeaderColumn)
      )
    );

    return columns;
  };

  const filter = (datas: ICompleteCharacter[], filters: ICharacterFilters) => {
    const { elements, query } = filters;
    return datas.filter(
      ({ defaultPosition, element, archetypes, firstName, lastName }) => {
        if (query) {
          const name = `${normalize(firstName)}${
            lastName ? " " + normalize(lastName) : ""
          }`;
          if (!name.includes(normalize(query))) return false;
        }
        if (
          filters.archetypes &&
          !filters.archetypes.some((e) => archetypes.includes(e as Archetype))
        )
          return false;
        if (elements && !elements.includes(element)) return false;
        if (positions && !positions.includes(defaultPosition)) return false;
        return true;
      }
    );
  };

  return (
    <Table
      {...props}
      defaultSort={{ key: "name", order: "asc" }}
      datas={completeCharacters}
      columns={getColumns()}
      filterFunction={filter}
      baseUrl="/characters"
      nameSlug="name"
      deleteFunction={deleteCharacter}
      itemName="character"
      defaultTab="basic"
      averages={averages}
      tabs={[
        {
          value: "basic",
          label: "Basic stats",
        },
        {
          value: "advanced",
          label: "Advanced stats",
        },
        {
          value: "hissatsus",
          label: "Hissatsus",
        },
      ]}
      filters={[
        {
          key: "positions",
          type: "checkbox",
          options: positions.map((p) => ({
            value: p,
            label: capitalize(p),
          })),
        },
        {
          key: "element",
          type: "checkbox",
          options: elements
            .filter((e) => e !== "void")
            .map((p) => ({ value: p, label: capitalize(p) })),
        },
        {
          key: "archetypes",
          type: "checkbox",
          options: archetypes
            .filter((e) => e !== "void")
            .map((p) => ({ value: p, label: capitalize(p) })),
        },
      ]}
    />
  );
}

export default CharacterTable;
