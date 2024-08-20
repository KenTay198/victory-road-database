"use client";
import { IDocument, IOption, ISort } from "@/types/types";
import Button from "@atoms/Button";
import { useConfirmModalState } from "@context/ConfirmModalContext";
import { useLoadingState } from "@context/LoadingContext";
import TableHeader, {
  IHeaderColumn,
} from "@organisms/Table/TableHeader/TableHeader";
import React, { useEffect, useMemo, useState } from "react";
import { FaEye, FaTrash } from "react-icons/fa";
import { toast } from "sonner";
import TableFilters, { IFilter } from "./TableHeader/TableFilters";
import Image from "next/image";
import AveragesRow from "./TableHeader/AveragesRow";
import { GrUpdate } from "react-icons/gr";
import CheckboxInput from "@atoms/Inputs/CheckboxInput";
import FunctionBar, { IBarFunction } from "./TableHeader/FunctionBar";

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
  const { showConfirm } = useConfirmModalState();
  const { setIsLoading } = useLoadingState();
  const [sort, setSort] = useState<ISort>(defaultSort);
  const [filteredDatas, setFilteredDatas] = useState<IDocument[]>([]);
  const [filtersValue, setFiltersValue] = useState<Record<string, any>>({});
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
        order: order || old.order === "asc" ? "desc" : "asc",
      }));

    return setSort({ key, order: order || "desc" });
  };

  const handleDelete = (id: string, name: string) => {
    showConfirm(
      "Delete a " + itemName,
      `Do you really want to delete "${name}" ?`,
      async () => {
        setIsLoading(true);
        try {
          await functions.deleteOne(id);
          toast.success(`The ${itemName} "${name}" has been deleted`);
        } catch (error) {
          console.log(error);
          toast.error(`An error has occured while deleting the ${itemName}`);
        }
        setIsLoading(false);
      },
      { width: 600 }
    );
  };

  const handleDeleteMultiple = (ids: string[]) => {
    const nb = ids.length;
    const name = `${itemName}${nb > 1 ? "s" : ""}`;
    showConfirm(
      "Delete a " + itemName,
      `Do you really want to delete ${nb} ${name} ?`,
      async () => {
        setIsLoading(true);
        try {
          await functions.deleteMultiple(ids);
          toast.success(`${nb} ${name} has been deleted`);
        } catch (error) {
          console.log(error);
          toast.error(`An error has occured while deleting the ${name}`);
        }
        setIsLoading(false);
      },
      { width: 600 }
    );
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

  const compareStatAverage = (key: string, value: number) => {
    const average = averages?.[key] || 0;
    if (value === 0 || value < average) return "below";
    if (value === average) return "equal";
    return "above";
  };

  const displayCellValue = (
    value: any,
    { key, type, imageObject, arrayOptions, displayFunction }: IHeaderColumn
  ): string | React.ReactNode => {
    if (displayFunction) return displayFunction(value);
    switch (type) {
      case "date":
        return new Date(value).toLocaleDateString();
      case "array":
        if (arrayOptions?.type && arrayOptions.type === "length")
          return value.length;
        if (arrayOptions?.labelKey)
          return value
            .map((e: any) => e[arrayOptions?.labelKey as keyof object])
            .join(", ");
        return value.map((e: any) => e.toString()).join(", ");
      case "number": {
        const state = compareStatAverage(key, value);

        return (
          <span
            className={`${
              state === "above"
                ? "text-green-700"
                : state === "below"
                ? "text-red-700"
                : ""
            }`}
          >
            {value}
          </span>
        );
      }
      default:
        if (imageObject) {
          const { object, key } = imageObject;
          return (
            <Image
              src={object[value][key]}
              alt={value}
              className="mx-auto"
              width={30}
            />
          );
        }
        return value;
    }
  };

  return (
    <>
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
                filteredDatas.map(({ _id, ...element }) => {
                  const baseKey = `${itemName || "data"}-${_id}`;
                  const selected = itemsSelected.includes(_id);
                  const toggleSelected = (val: boolean) =>
                    setItemsSelected(
                      val
                        ? [...itemsSelected, _id]
                        : itemsSelected.filter((e) => e !== _id)
                    );
                  return (
                    <tr
                      key={baseKey}
                      className="relative z-0 bg-white duration-200 cursor-pointer hover:brightness-95"
                      onClick={() => toggleSelected(!selected)}
                    >
                      <th className="px-2">
                        <CheckboxInput
                          id={`${baseKey}-select-checkbox`}
                          checked={selected}
                          handleChange={toggleSelected}
                        />
                      </th>
                      {tabColumns.map((column) => {
                        const { key, parent } = column;
                        const elementObject = parent?.key
                          ? element[parent.key as keyof object]
                          : element;
                        const value =
                          elementObject[
                            (parent?.index !== undefined
                              ? parent.index
                              : key) as keyof object
                          ];
                        return (
                          <td key={`${baseKey}-${key}`} className="px-2 py-2">
                            {displayCellValue(value, column)}
                          </td>
                        );
                      })}
                      <td>
                        <div className="px-1 flex gap-1 justify-center items-center">
                          <Button
                            color="blue"
                            href={`${baseUrl}/${_id}`}
                            icon={FaEye}
                            onClick={(e) => e.stopPropagation()}
                            title="View"
                          >
                            <span className="hidden">View</span>
                          </Button>
                          <Button
                            color="blue"
                            href={`${baseUrl}/update/${_id}`}
                            icon={GrUpdate}
                            onClick={(e) => e.stopPropagation()}
                            title="Update"
                          >
                            <span className="hidden">Update</span>
                          </Button>
                          <Button
                            color="blue"
                            icon={FaTrash}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(
                                _id,
                                element[nameSlug as keyof object]
                              );
                            }}
                            title="Delete"
                          >
                            <span className="hidden">Delete</span>
                          </Button>
                        </div>
                      </td>
                    </tr>
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
          deleteMultiple={() => handleDeleteMultiple(itemsSelected)}
          otherFunctions={functions.others}
        />
      )}
    </>
  );
}

export default Table;
