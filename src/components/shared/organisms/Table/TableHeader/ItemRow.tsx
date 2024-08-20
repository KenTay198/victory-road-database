import Button from "@atoms/Button";
import CheckboxInput from "@atoms/Inputs/CheckboxInput";
import React from "react";
import { FaEye, FaTrash } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";
import { IHeaderColumn } from "./TableHeader";
import { IDocument } from "@/types/types";
import Image from "next/image";
import { useConfirmModalState } from "@context/ConfirmModalContext";
import { useLoadingState } from "@context/LoadingContext";
import { toast } from "sonner";

interface IProps {
  element: IDocument;
  itemsSelected: string[];
  setItemsSelected: (val: string[]) => void;
  columns: IHeaderColumn[];
  baseUrl: string;
  nameSlug: string;
  deleteFunction: (id: string) => Promise<void>;
  averages?: Record<string, number>;
  itemName?: string;
}

function ItemRow({
  element,
  itemName,
  setItemsSelected,
  itemsSelected,
  columns,
  averages,
  deleteFunction,
  baseUrl,
  nameSlug,
}: IProps) {
  const { showConfirm } = useConfirmModalState();
  const { setIsLoading } = useLoadingState();
  const { _id } = element;
  const baseKey = `${itemName || "data"}-${_id}`;
  const selected = itemsSelected.includes(_id);
  const toggleSelected = (val: boolean) =>
    setItemsSelected(
      val ? [...itemsSelected, _id] : itemsSelected.filter((e) => e !== _id)
    );

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

  const handleDelete = (id: string, name: string) => {
    showConfirm(
      "Delete a " + itemName,
      `Do you really want to delete "${name}" ?`,
      async () => {
        setIsLoading(true);
        try {
          await deleteFunction(id);
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

  return (
    <tr
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
      {columns.map((column) => {
        const { key, parent } = column;
        const elementObject = parent?.key
          ? element[parent.key as keyof object]
          : element;
        const value =
          elementObject[
            (parent?.index !== undefined ? parent.index : key) as keyof object
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
              handleDelete(_id, element[nameSlug as keyof object]);
            }}
            title="Delete"
          >
            <span className="hidden">Delete</span>
          </Button>
        </div>
      </td>
    </tr>
  );
}

export default ItemRow;
