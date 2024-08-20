import React from "react";
import { IHeaderColumn } from "./TableHeader";

interface IProps {
  averages: Record<string, number>;
  columns: IHeaderColumn[];
}

function AveragesRow({ averages, columns }: IProps) {
  return (
    <tr className="font-bold">
      <th className="sticky top-12 z-[1] bg-gray-300"></th>
      {columns.map(({ key, averageLabel, withAverage }) => (
        <th key={`averages-row-${key}`} className="sticky top-12 z-[1] bg-gray-300">
          {averageLabel ? "Averages" : withAverage && averages[key]}
        </th>
      ))}
      <th className="sticky top-12 z-[1] bg-gray-300"></th>
    </tr>
  );
}

export default AveragesRow;
