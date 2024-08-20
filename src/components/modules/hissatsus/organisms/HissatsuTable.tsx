"use client";
import React from "react";
import IHissatsu, {
  hissatsuCharacteristics,
  hissatsuTypes,
} from "@/types/hissatsu.types";
import { capitalize, normalize } from "@utils/functions";
import { elementDatas, elements } from "@utils/variables";
import { IHeaderColumn } from "@organisms/Table/TableHeader/TableHeader";
import {
  deleteHissatsu,
  deleteMultipleHissatsus,
} from "@/controllers/hissatsus.controller";
import Table from "@organisms/Table/Table";

export interface IHissatsuFilters {
  characteristics: string[];
  types: string[];
  elements: string[];
  query: string;
}

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  hissatsus: IHissatsu[];
}

function HissatsuTable({ hissatsus, ...props }: IProps) {
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
        key: "element",
        type: "string",
        imageObject: { key: "image", object: elementDatas },
      },
      { key: "type", type: "string" },
      { key: "characteristic", type: "string" },
    ];
  };

  const filter = (datas: IHissatsu[], filters: IHissatsuFilters) => {
    const { characteristics, elements, query, types } = filters;
    return datas.filter(({ name, element, type, characteristic }) => {
      if (query && !normalize(name).includes(normalize(query))) return false;

      if (characteristics) {
        if (characteristic) {
          if (!characteristics.includes(characteristic)) return false;
        } else {
          if (!characteristics.includes("none")) return false;
        }
      }

      if (elements && !elements.includes(element)) return false;
      if (types && !types.includes(type)) return false;
      return true;
    });
  };

  return (
    <Table
      {...props}
      defaultSort={{ key: "name", order: "asc" }}
      datas={hissatsus}
      columns={getColumns()}
      functions={{
        filter,
        deleteOne: deleteHissatsu,
        deleteMultiple: deleteMultipleHissatsus,
      }}
      baseUrl="/hissatsus"
      nameSlug="name"
      itemName="hissatsu"
      filters={[
        {
          key: "types",
          type: "checkbox",
          options: hissatsuTypes.map((p) => ({
            value: p,
            label: capitalize(p),
          })),
        },
        {
          key: "elements",
          type: "checkbox",
          options: elements
            .filter((e) => e !== "void")
            .map((p) => ({ value: p, label: capitalize(p) })),
        },
        {
          key: "characteristics",
          type: "checkbox",
          options: [...hissatsuCharacteristics, "none"]
            .filter((e) => e !== "void")
            .map((p) => ({ value: p, label: capitalize(p) })),
        },
      ]}
    />
  );
}

export default HissatsuTable;
