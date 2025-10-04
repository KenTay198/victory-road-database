"use client";
import type React from "react";
import { TiArrowSortedDown, TiArrowSortedUp, TiArrowUnsorted } from "react-icons/ti";
import type { ItemTableProperty, SortState } from "./ItemTable";

interface IProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  properties: ItemTableProperty[];
  sortState: SortState | null;
  onSort: (property: string) => void;
  allSelected: boolean;
  onSelectAll: (value: boolean) => void;
}

const ItemTableHeader = ({ className, properties, sortState, onSort, onSelectAll, allSelected, ...props }: IProps) => {
  const getSortIcon = (property: ItemTableProperty) => {
    if (sortState && sortState.property === property.slug) {
      return sortState.order === "asc" ? <TiArrowSortedUp size={12} /> : <TiArrowSortedDown size={12} />;
    }

    return <TiArrowUnsorted size={12} className="opacity-50" />;
  };

  return (
    <thead {...props} className={["bg-raimon-yellow w-full", className].join(" ")}>
      <tr>
        <th onClick={() => onSelectAll(!allSelected)} className="">
          <input
            type="checkbox"
            checked={allSelected}
            onChange={() => onSelectAll(!allSelected)}
            className="cursor-pointer"
          />
        </th>
        {properties.map((property) => (
          <th key={String(property.slug)} className="text-center">
            {property.sortType ? (
              <button
                type="button"
                onClick={() => onSort(property.slug)}
                className="cursor-pointer flex justify-center items-center gap-2 hover:bg-raimon-yellow/80 px-2 py-1 rounded transition-colors w-full "
              >
                <span>{property.label}</span>
                <span>{getSortIcon(property)}</span>
              </button>
            ) : (
              <span className="px-2 py-1 w-full">{property.label}</span>
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default ItemTableHeader;
