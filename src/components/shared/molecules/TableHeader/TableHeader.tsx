import { ISort } from "@/types/types";
import { capitalize } from "@utils/functions";
import React from "react";
import HeaderCell from "./HeaderCell";

export interface IHeaderColumn {
  key: string;
  className?: string;
  label?: string;
  baseOrder?: "asc" | "desc";
  width?: number;
  noSorted?: boolean;
}

interface IProps {
  sort: ISort;
  handleChangeSortKey: (key: string, order?: "asc" | "desc") => void;
  columns: IHeaderColumn[];
}

function TableHeader({ sort, handleChangeSortKey, columns }: IProps) {
  const displayColumns = () => (
    <>
      {columns.map(({ key, label, baseOrder, noSorted, ...rest }) => (
        <HeaderCell
          {...rest}
          key={`statistic-header-${key}`}
          onClick={() => {
            if (!noSorted) handleChangeSortKey(key, baseOrder);
          }}
          label={label || capitalize(key)}
          state={noSorted ? undefined : key === sort.key ? sort.order : "none"}
        />
      ))}
    </>
  );

  return (
    <thead>
      <tr className="border-b-2 border-gray-300">
        {displayColumns()}
        <HeaderCell label="Functions" className="rounded-tr-[9px]" />
      </tr>
    </thead>
  );
}
export default TableHeader;
