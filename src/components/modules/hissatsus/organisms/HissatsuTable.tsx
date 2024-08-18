"use client";
import Button from "@atoms/Button";
import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";
import { useConfirmModalState } from "@context/ConfirmModalContext";
import { toast } from "sonner";
import { useLoadingState } from "@context/LoadingContext";
import IHissatsu, {
  hissatsuCharacteristics,
  hissatsuTypes,
} from "@/types/hissatsu.types";
import { capitalize, normalize } from "@utils/functions";
import Image from "next/image";
import { elementDatas, elements } from "@utils/variables";
import Link from "next/link";
import HissatsuTableFilters, {
  IHissatsuFilters,
} from "../molecules/HissatsuTableFilters";
import TableHeader, { IHeaderColumn } from "@molecules/TableHeader/TableHeader";
import { ISort } from "@/types/types";
import { deleteHissatsu } from "@/controllers/hissatsus.controller";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  hissatsus: IHissatsu[];
}

function HissatsuTable({ hissatsus, className, ...props }: IProps) {
  const { showConfirm } = useConfirmModalState();
  const { setIsLoading } = useLoadingState();
  const [filteredHissatsus, setFilteredHissatsus] = useState<IHissatsu[]>([]);
  const [filters, setFilters] = useState<IHissatsuFilters>({
    characteristics: [...hissatsuCharacteristics, "none"],
    types: hissatsuTypes,
    elements: elements,
    query: "",
  });
  const [sort, setSort] = useState<ISort>({
    key: "name",
    order: "asc",
  });

  const handleDelete = (id: string, name: string) => {
    showConfirm(
      "Delete a hissatsu",
      `Do you really want to delete "${name}" ?`,
      async () => {
        setIsLoading(true);
        try {
          await deleteHissatsu(id);
          toast.success(`The hissatsu "${name}" has been deleted`);
        } catch (error) {
          console.log(error);
          toast.error("An error has occured while deleting the hissatsu");
        }
        setIsLoading(false);
      },
      { width: 600 }
    );
  };

  const handleChangeSortKey = (key: string, order?: "asc" | "desc") => {
    if (key === sort.key)
      return setSort((old) => {
        const baseOrder = order === old.order ? order : old.order;
        return {
          ...old,
          order: baseOrder === "asc" ? "desc" : "asc",
        };
      });

    return setSort({ key, order: order || "desc" });
  };

  useEffect(() => {
    const hissa = Array.from(hissatsus);

    const { elements, characteristics, types, query } = filters;

    setFilteredHissatsus(() =>
      hissa
        .filter(({ name, element, type, characteristic }) => {
          if (query && !normalize(name).includes(normalize(query))) return false;

          if (characteristic) {
            if (!characteristics.includes(characteristic)) return false;
          } else {
            if (!characteristics.includes("none")) return false;
          }

          if (!elements.includes(element)) return false;
          if (!types.includes(type)) return false;
          return true;
        })
        .sort((a, b) => {
          const key = sort.key as keyof IHissatsu;
          const aValue = a[key] as string;
          const bValue = b[key] as string;
          if (sort.order === "desc") return bValue.localeCompare(aValue);
          return aValue.localeCompare(bValue);
        })
    );
  }, [sort, hissatsus, filters]);

  const getColumns = (): IHeaderColumn[] => {
    return [
      {
        key: "name",
        width: 150,
        baseOrder: "asc",
        className: "rounded-tl-[9px]",
      },
      { key: "element" },
      { key: "type" },
      { key: "characteristic" },
    ];
  };

  return (
    <>
      <HissatsuTableFilters filters={filters} handleChange={setFilters} />
      <div
        {...props}
        className={[
          "relative rounded-lg w-fit shadow",
          "after:border-2 after:rounded-lg after:pointer-events-none after:border-gray-300 after:absolute after:top-0 after:left-0 after:w-full after:h-full",
          className,
        ].join(" ")}
      >
        <table className="text-center">
          <TableHeader
            sort={sort}
            handleChangeSortKey={handleChangeSortKey}
            columns={getColumns()}
          />
          <tbody>
            {filteredHissatsus.map(
              ({ _id, name, element, type, characteristic }) => {
                return (
                  <tr key={`hissatsu-${_id}`}>
                    <td className="px-2 py-2">
                      <Link
                        href={`https://inazuma-eleven.fandom.com/fr/wiki/${name.replace(
                          " ",
                          "_"
                        )}`}
                        target="_blank"
                      >
                        {name}
                      </Link>
                    </td>
                    <td>
                      <Image
                        src={elementDatas[element].image}
                        alt={"Element " + element}
                        className="mx-auto"
                        width={30}
                      />
                    </td>{" "}
                    <td className="px-2">{capitalize(type)}</td>
                    <td className="px-2">
                      {characteristic && capitalize(characteristic)}
                    </td>
                    <td>
                      <div className="px-1 flex gap-1 items-center">
                        <Button
                          color="blue"
                          href={"/hissatsus/" + _id}
                          icon={GrUpdate}
                          title="Update"
                        >
                          <span className="hidden">Update</span>
                        </Button>
                        <Button
                          color="blue"
                          icon={FaTrash}
                          onClick={() => handleDelete(_id, name)}
                          title="Delete"
                        >
                          <span className="hidden">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default HissatsuTable;
