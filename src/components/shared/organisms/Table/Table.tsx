"use client";
import { IDocument, IOption, ISort } from "@/types/types";
import TableHeader, {
  IHeaderColumn,
} from "@organisms/Table/TableHeader/TableHeader";
import React, { useEffect, useMemo, useState } from "react";
import TableFilters, { IFilter } from "./TableHeader/TableFilters";
import AveragesRow from "./TableHeader/AveragesRow";
import FunctionBar, { IBarFunction } from "./TableHeader/FunctionBar";
import ItemRow from "./TableHeader/ItemRow";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultSort: ISort;
  columns: IHeaderColumn[];
  datas: IDocument[];
  baseUrl: string;
  nameSlug: string;
  functions: {
    filter: (datas: any[], filters: any) => any[];
    deleteOne: (id: string) => Promise<void>;
    deleteMultiple: (ids: string[]) => Promise<void>;
    others?: IBarFunction[];
  };
  tabs?: IOption[];
  defaultTab?: string;
  filters?: IFilter[];
  itemName?: string;
  averages?: Record<string, number>;
}

const getDefaultFilters = (filters?: IFilter[]): Record<string, any> =>
  filters?.reduce((acc, filter) => {
    if (filter.type === "checkbox") {
      acc[filter.key] = filter.options.map((option) => option.value);
    } else if (filter.type === "radio") {
      acc[filter.key] =
        filter.options.length > 0 ? filter.options[0].value : null;
    }
    return acc;
  }, {} as Record<string, any>) || {};

function Table({
  columns,
  datas,
  defaultSort,
  className,
  baseUrl,
  itemName,
  nameSlug,
  filters,
  tabs,
  defaultTab,
  averages,
  functions,
  ...props
}: IProps) {
  const [sort, setSort] = useState<ISort>(defaultSort);
  const [filteredDatas, setFilteredDatas] = useState<IDocument[]>([]);
  const [filtersValue, setFiltersValue] = useState<Record<string, any>>(
    getDefaultFilters(filters)
  );
  const [query, setQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState(defaultTab || "");
  const [itemsSelected, setItemsSelected] = useState<string[]>([]);
  const allSelected = useMemo(
    () => filteredDatas.every(({ _id }) => itemsSelected.includes(_id)),
    [filteredDatas, itemsSelected]
  );
  const oneSelected = useMemo(() => itemsSelected.length > 0, [itemsSelected]);
  const tabColumns = useMemo(
    () => columns.filter(({ tab }) => !tab || tab === selectedTab),
    [columns, selectedTab]
  );

  const handleChangeSortKey = (key: string, order?: "asc" | "desc") => {
    if (key === sort.key)
      return setSort((old) => ({
        ...old,
        order: old.order === "asc" ? "desc" : "asc",
      }));

    return setSort({ key, order: order || "desc" });
  };

  useEffect(() => {
    const arrayData = Array.from(datas);

    const column = tabColumns.find(({ key }) => key === sort.key);

    setFilteredDatas((old) => {
      if (!column) return old;
      return functions
        .filter(arrayData, { ...filtersValue, query })
        .sort((a, b) => {
          const { parent, type } = column;
          const aObject = parent?.key ? a[parent.key] : a;
          const bObject = parent?.key ? b[parent.key] : b;
          const aValue = aObject[sort.key as keyof object];
          const bValue = bObject[sort.key as keyof object];

          switch (type) {
            case "number":
              if (sort.order === "desc")
                return (bValue as number) - (aValue as number);
              return (aValue as number) - (bValue as number);
            case "date":
              if (sort.order === "desc")
                return new Date(bValue).getTime() - new Date(aValue).getTime();
              return new Date(aValue).getTime() - new Date(bValue).getTime();
            case "array":
              if (sort.order === "desc") return bValue.length - aValue.length;
              return aValue.length - bValue.length;
            default:
              if (sort.order === "desc")
                return (bValue as string).localeCompare(aValue as string);
              return (aValue as string).localeCompare(bValue as string);
          }
        });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort, datas, filtersValue, query]);

  return (
    <div className="pb-16">
      <TableFilters
        value={filtersValue}
        handleChange={setFiltersValue}
        query={query}
        handleChangeQuery={setQuery}
        filters={filters}
        itemName={itemName}
        tabs={tabs}
        tab={selectedTab}
        handleChangeTab={setSelectedTab}
      />

      <div
        {...props}
        className={[
          "relative w-fit max-w-full h-full max-h-[500px] rounded-[9px] overflow-auto shadow-lg",
          className,
        ].join("")}
      >
        <div className="relative rounded-lg w-fit h-full">
          <table className="text-center">
            <TableHeader
              sort={sort}
              handleChangeSortKey={handleChangeSortKey}
              columns={tabColumns}
              allSelected={allSelected}
              handleChangeSelectAll={(val) =>
                setItemsSelected(val ? filteredDatas.map(({ _id }) => _id) : [])
              }
            />
            <tbody>
              {tabColumns.some(({ withAverage }) => withAverage) &&
                averages && (
                  <AveragesRow averages={averages} columns={tabColumns} />
                )}
              {filteredDatas.length > 0 ? (
                filteredDatas.map((element) => {
                  return (
                    <ItemRow
                      key={`${itemName || "data"}-${element._id}`}
                      itemName={itemName}
                      element={element}
                      itemsSelected={itemsSelected}
                      setItemsSelected={setItemsSelected}
                      columns={tabColumns}
                      averages={averages}
                      baseUrl={baseUrl}
                      nameSlug={nameSlug}
                      deleteFunction={functions.deleteOne}
                    />
                  );
                })
              ) : (
                <tr>
                  <td colSpan={100}>
                    No {itemName ? itemName + "s" : "datas"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {oneSelected && (
        <FunctionBar
          ids={itemsSelected}
          deleteMultiple={functions.deleteMultiple}
          otherFunctions={functions.others}
        />
      )}
    </div>
  );
}

export default Table;
