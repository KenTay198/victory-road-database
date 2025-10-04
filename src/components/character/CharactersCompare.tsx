import React, { useMemo, useState } from "react";
import type Character from "@character/entities/character.entity";
import CharacterImage from "@components/character/CharacterImage";
import CharacterPropertyFormatter from "@components/character/CharacterPropertyFormatter";
import { useTranslations } from "next-intl";
import { advancedStatKeys, statKeys } from "@character/character.variables";
import type { IAdvancedStatistics, IStatistics } from "@character/character.types";
import NumericHelpers, { type IStatisticDescriptions } from "@utils/helpers/numeric.helpers";
import ColorsHelper from "@utils/helpers/colors.helpers";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  characters: Character[];
}

const CharactersCompare = ({ className, characters, ...props }: IProps) => {
  const excludedAdvancedStats = ["faceoffAtt", "faceoffDef"];
  const t = useTranslations("character");

  const statDescriptions: Record<string, IStatisticDescriptions> = useMemo(
    () =>
      NumericHelpers.getStatDescriptionsByProperties(
        characters,
        statKeys.map((key) => `statistics.${key}`).concat(advancedStatKeys.map((key) => `advancedStatistics.${key}`)),
      ),
    [characters],
  );

  return (
    <div {...props} className={["", className].join(" ")}>
      <table className="bordered w-full rounded">
        <thead>
          <tr>
            <th className="align-bottom">{t("comparison.criteria")}</th>
            {characters.map((character) => (
              <th key={character.id}>
                <div className="sticky flex flex-col items-center">
                  <CharacterImage character={character} />
                  <p>{character.fullName}</p>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <CompareSection title={t("comparison.general")} colSpan={characters.length + 1}>
            {["element", "defaultPosition"].map((property) => (
              <tr key={property}>
                <td className="font-bold">{t(`properties.${property}`)}</td>
                {characters.map((character) => (
                  <td key={character.id}>
                    <div className="flex justify-center">
                      <CharacterPropertyFormatter property={property} value={character[property as keyof Character]} />
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </CompareSection>

          <CompareSection title={t("properties.statistics")} colSpan={characters.length + 1}>
            {statKeys.map((stat) => (
              <tr key={stat} className={stat.includes("total") ? "bg-raimon-blue/30" : ""}>
                <td className="font-bold">{t(`statistics.${stat}`)}</td>
                {characters.map((character) => {
                  const value = character.statistics[stat as keyof IStatistics];
                  const color = ColorsHelper.getColorByTier(value, statDescriptions[`statistics.${stat}`]);
                  return (
                    <td key={character.id} className="font-bold text-center" style={{ color }}>
                      {character.statistics[stat as keyof IStatistics]}
                    </td>
                  );
                })}
              </tr>
            ))}
          </CompareSection>

          <CompareSection title={t("properties.advancedStatistics")} colSpan={characters.length + 1}>
            {advancedStatKeys
              .filter((key) => !excludedAdvancedStats.includes(key))
              .map((stat) => (
                <tr key={stat} className={stat.includes("total") ? "bg-raimon-blue/30" : ""}>
                  <td className="font-bold">{t(`advancedStatistics.${stat}`)}</td>
                  {characters.map((character) => {
                    const value = character.advancedStatistics[stat as keyof IAdvancedStatistics];
                    const color = ColorsHelper.getColorByTier(value, statDescriptions[`advancedStatistics.${stat}`]);
                    return (
                      <td key={character.id} className="font-bold text-center" style={{ color }}>
                        {value}
                      </td>
                    );
                  })}
                </tr>
              ))}
          </CompareSection>
        </tbody>
      </table>
    </div>
  );
};

const CompareSection = ({
  title,
  children,
  colSpan,
}: {
  title: string;
  children: React.ReactNode;
  colSpan: number;
}) => {
  const [expanded, setExpanded] = useState(true);
  const ExpandIcon = expanded ? FaChevronUp : FaChevronDown;
  return (
    <>
      <tr onClick={() => setExpanded((prev) => !prev)} className="cursor-pointer">
        <td colSpan={colSpan} className="bg-raimon-blue text-white font-bold">
          <div className="flex justify-between items-center">
            {title}
            <ExpandIcon />
          </div>
        </td>
      </tr>
      {expanded && children}
    </>
  );
};

export default CharactersCompare;
