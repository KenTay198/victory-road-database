import { ICompleteStatistics, IStatistics } from "@/types/character.types";
import { statisticsLabels, advancedStatisticsLabels } from "@utils/variables";
import React from "react";
import { Info } from "./CharacterTableFilters";

interface IProps {
  averages: ICompleteStatistics;
  info: Info;
}

function CharacterAveragesRow({ averages, info }: IProps) {
  const displayColumns = () => {
    switch (info) {
      case "basic":
        return (
          <>
            {statisticsLabels.map((label) => (
              <th
                key={`average-statistic-${label}`}
                className="px-2 sticky top-[96px] bg-gray-300"
              >
                {averages[label as keyof IStatistics]}
              </th>
            ))}
            <th className="px-2 sticky top-[96px] bg-gray-300">
              {averages.total}
            </th>
          </>
        );
      case "advanced":
        return (
          <>
            {advancedStatisticsLabels.map((label) => (
              <th
                key={`average-statistic-${label}`}
                className="px-2 sticky top-[96px] bg-gray-300"
              >
                {averages[label as keyof ICompleteStatistics]}
              </th>
            ))}
          </>
        );
      default:
        break;
    }
  };

  if (info === "hissatsus") return;

  return (
    <tr className="font-bold">
      <th className="px-2 py-2 sticky top-[96px] bg-gray-300">Averages</th>
      <th className="sticky top-[96px] bg-gray-300"></th>
      <th className="sticky top-[96px] bg-gray-300"></th>
      {displayColumns()}
      <th className="sticky top-[96px] bg-gray-300"></th>
    </tr>
  );
}

export default CharacterAveragesRow;
