"use client";
import { IDocument, ISort } from "@/types/types";
import Button from "@atoms/Button";
import TableHeader, { IHeaderColumn } from "@molecules/TableHeader/TableHeader";
import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";

interface IProps<T = IDocument> extends React.HTMLAttributes<HTMLDivElement> {
  defaultSort: ISort;
  columns: IHeaderColumn[];
  datas: T[];
  filterFunction: (datas: T[]) => T[];
}

function Table<T = IDocument>({
  filterFunction,
  columns,
  datas,
  defaultSort,
  className,
  ...props
}: IProps<T>) {
  const [sort, setSort] = useState<ISort>(defaultSort);
  const [filteredDatas, setFilteredDatas] = useState<T[]>([]);

  const handleChangeSortKey = (key: string, order?: "asc" | "desc") => {
    if (key === sort.key)
      return setSort((old) => ({
        ...old,
        order: order || old.order === "asc" ? "desc" : "asc",
      }));

    return setSort({ key, order: order || "desc" });
  };

//   useEffect(() => {
//     const arrayData = Array.from(datas);

//     setFilteredDatas(() =>
//       filterFunction(arrayData).sort((a, b) => {
//         switch (sort.key) {
//           case "lastUpdated": {
//             const aValue = new Date(a.updatedAt).getTime();
//             const bValue = new Date(b.updatedAt).getTime();
//             if (sort.order === "desc") return aValue - bValue;
//             return bValue - aValue;
//           }

//           default: {
//             const aValue = a.name as string;
//             const bValue = b.name as string;
//             if (sort.order === "desc") return bValue.localeCompare(aValue);
//             return aValue.localeCompare(bValue);
//           }
//         }
//       })
//     );
//   }, [sort, datas]);

  return (
    <>
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
            columns={columns}
          />
          {/* <tbody>
            {filteredDatas.length > 0 ? (
              filteredDatas.map(({ _id, name, characters, updatedAt }) => {
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
          </tbody> */}
        </table>
      </div>
    </>
  );
}

export default Table;
