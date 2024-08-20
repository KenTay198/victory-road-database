import React from "react";
import { IHeaderColumn } from "./TableHeader";

interface IProps {
  averages: Record<string, number>;
  columns: IHeaderColumn[];
}

function AveragesRow({ averages, columns }: IProps) {
  return (
    <tr className="font-bold">
      {columns.map(({ key, averageLabel, withAverage }) => (
        <th
          key={`averages-row-${key}`}
          className="sticky top-[96px] bg-gray-300"
        >
          {averageLabel ? "Averages" : withAverage && averages[key]}
        </th>
      ))}
      <th className="sticky top-[96px] bg-gray-300"></th>
    </tr>
  );
}

export default AveragesRow;
