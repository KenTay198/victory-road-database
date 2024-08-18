import React from "react";
import { IconType } from "react-icons";
import {
  TiArrowSortedDown,
  TiArrowSortedUp,
  TiArrowUnsorted,
} from "react-icons/ti";

interface IHeaderCellProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  state?: "asc" | "desc" | "none";
  width?: number;
}

function HeaderCell({
  state,
  label,
  width,
  className,
  ...props
}: IHeaderCellProps) {
  let SortIcon: IconType | undefined;

  if (state === "desc") {
    SortIcon = TiArrowSortedDown;
  } else if (state === "asc") {
    SortIcon = TiArrowSortedUp;
  } else if (state === "none") {
    SortIcon = TiArrowUnsorted;
  }

  return (
    <th
      {...props}
      className={["bg-raimon-yellow px-2 sticky top-12", className].join(" ")}
    >
      <div
        style={{ width: `${width || 100}px` }}
        className={`flex items-center justify-center h-[48px] mx-auto ${state ? "cursor-pointer" : ""}`}
      >
        <p>{label}</p>
        {SortIcon && <SortIcon />}
      </div>
    </th>
  );
}

export default HeaderCell;
