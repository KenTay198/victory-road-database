import { ISort } from "@/types/types";
import { capitalize } from "@utils/functions";
import React from "react";
import HeaderCell from "./HeaderCell";
import CheckboxInput from "@atoms/Inputs/CheckboxInput";

export interface IHeaderColumn {
  key: string;
  type: "string" | "number" | "date" | "array";
  parent?: {
    key: string;
    index?: number;
  };
  tab?: string;
  displayFunction?: (data: any) => string | React.ReactNode;
  arrayOptions?: {
    type?: "length" | "join";
    labelKey?: string;
    arrayIndex?: number;
  };
  imageObject?: {
    object: Record<string, any>;
    key: string;
  };
  className?: string;
  label?: string;
  baseOrder?: "asc" | "desc";
  width?: number;
  averageLabel?: boolean;
  withAverage?: boolean;
  noSorted?: boolean;
}

interface IProps {
  sort: ISort;
  handleChangeSortKey: (key: string, order?: "asc" | "desc") => void;
  columns: IHeaderColumn[];
  allSelected: boolean;
  handleChangeSelectAll: (val: boolean) => void;
}

function TableHeader({
  sort,
  handleChangeSortKey,
  columns,
  allSelected,
  handleChangeSelectAll,
}: IProps) {
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
        <th className="bg-raimon-yellow px-2 sticky top-0 z-[1] rounded-tl-[9px]">
          <CheckboxInput
            id="select-all"
            checked={allSelected}
            handleChange={handleChangeSelectAll}
          />
        </th>
        {displayColumns()}
        <HeaderCell
          label="Functions"
          className="rounded-tr-[9px]"
          width={150}
        />
      </tr>
    </thead>
  );
}
export default TableHeader;
