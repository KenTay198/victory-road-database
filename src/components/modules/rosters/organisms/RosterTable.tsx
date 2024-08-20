"use client";
import { IRoster } from "@/types/roster.types";
import { normalize } from "@utils/functions";
import React from "react";
import { IHeaderColumn } from "@organisms/Table/TableHeader/TableHeader";
import {
  deleteMultipleRosters,
  deleteRoster,
} from "@/controllers/rosters.controller";
import Table from "@organisms/Table/Table";

export interface IRosterFilters {
  query: string;
}

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  rosters: IRoster[];
}

function RosterTable({ rosters, ...props }: IProps) {
  const getColumns = (): IHeaderColumn[] => {
    return [
      {
        key: "name",
        width: 150,
        baseOrder: "asc",
        className: "rounded-tl-[9px]",
        type: "string",
      },
      {
        key: "characters",
        label: "Characters number",
        width: 150,
        type: "array",
        arrayOptions: { type: "length" },
      },
      { key: "updatedAt", width: 150, label: "Last update", type: "date" },
    ];
  };

  const filter = (datas: IRoster[], filters: IRosterFilters) => {
    const { query } = filters;
    return datas.filter(({ name }) => {
      if (query && !normalize(name).includes(normalize(query))) return false;
      return true;
    });
  };

  return (
    <>
      <Table
        {...props}
        defaultSort={{ key: "updatedAt", order: "desc" }}
        datas={rosters}
        columns={getColumns()}
        functions={{
          filter,
          deleteOne: deleteRoster,
          deleteMultiple: deleteMultipleRosters,
        }}
        baseUrl="/dashboard/rosters"
        nameSlug="name"
        itemName="roster"
      />
    </>
  );
}

export default RosterTable;
