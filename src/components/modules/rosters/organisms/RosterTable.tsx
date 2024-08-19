"use client";
import { IRoster } from "@/types/roster.types";
import { normalize } from "@utils/functions";
import React, { useEffect, useState } from "react";
import { ISort } from "@/types/types";
import TableHeader, { IHeaderColumn } from "@molecules/TableHeader/TableHeader";
import Button from "@atoms/Button";
import { FaTrash } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";
import { useConfirmModalState } from "@context/ConfirmModalContext";
import { useLoadingState } from "@context/LoadingContext";
import { toast } from "sonner";
import TextInput from "@atoms/Inputs/TextInput";
import { deleteRoster } from "@/controllers/rosters.controller";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  rosters: IRoster[];
}

function RosterTable({ rosters, className, ...props }: IProps) {
  const { showConfirm } = useConfirmModalState();
  const { setIsLoading } = useLoadingState();
  const [sort, setSort] = useState<ISort>({
    key: "lastUpdated",
    order: "desc",
  });
  const [filteredRosters, setFilteredRosters] = useState<IRoster[]>([]);
  const [query, setQuery] = useState("");

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
      "Delete a roster",
      `Do you really want to delete "${name}" ?`,
      async () => {
        setIsLoading(true);
        try {
          await deleteRoster(id);
          toast.success(`The roster "${name}" has been deleted`);
        } catch (error) {
          console.log(error);
          toast.error("An error has occured while deleting the roster");
        }
        setIsLoading(false);
      },
      { width: 600 }
    );
  };

  useEffect(() => {
    const rostersArray = Array.from(rosters);

    setFilteredRosters(() =>
      rostersArray
        .filter(({ name }) => {
          if (query && !normalize(name).includes(normalize(query)))
            return false;
          return true;
        })
        .sort((a, b) => {
          switch (sort.key) {
            case "lastUpdated": {
              const aValue = new Date(a.updatedAt).getTime();
              const bValue = new Date(b.updatedAt).getTime();
              if (sort.order === "desc") return aValue - bValue;
              return bValue - aValue;
            }

            default: {
              const aValue = a.name as string;
              const bValue = b.name as string;
              if (sort.order === "desc") return bValue.localeCompare(aValue);
              return aValue.localeCompare(bValue);
            }
          }
        })
    );
  }, [sort, query, rosters]);

  const getColumns = (): IHeaderColumn[] => {
    return [
      {
        key: "name",
        width: 150,
        baseOrder: "asc",
        className: "rounded-tl-[9px]",
      },
      {
        key: "nbCharacters",
        label: "Characters number",
        width: 150,
        noSorted: true,
      },
      { key: "lastUpdated", width: 150, label: "Last update" },
    ];
  };

  return (
    <>
      <TextInput
        id="Character search"
        placeholder="Search character..."
        divClassName="max-w-[500px] w-full mb-2"
        value={query}
        handleChange={setQuery}
      />
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
            {filteredRosters.length > 0 ? (
              filteredRosters.map(({ _id, name, characters, updatedAt }) => {
                return (
                  <tr key={`roster-${_id}`}>
                    <td className="px-2 py-2">{name}</td>
                    <td className="px-2 py-2">{characters.length}</td>
                    <td className="px-2 py-2">
                      {new Date(updatedAt).toLocaleDateString()}
                    </td>
                    <td>
                      <div className="px-1 flex gap-1 justify-center items-center">
                        <Button
                          color="blue"
                          href={"/dashboard/rosters/" + _id}
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
              })
            ) : (
              <tr>
                <td colSpan={100}>No rosters</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default RosterTable;
