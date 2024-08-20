import { ICompleteCharacter, IStatistics } from "@/types/character.types";
import { capitalize, getAdvancedStatLabel } from "@utils/functions";
import { advancedStatisticsLabels, statisticsLabels } from "@utils/variables";
import Image from "next/image";
import React from "react";

interface IProps {
  characters: ICompleteCharacter[];
  close: () => void;
}

interface IData {
  categoryLabel: string;
  datas: {
    comparisonKey: string;
    values: { id: string; value: any }[];
  }[];
}

function CompareCharacters({ characters, close }: IProps) {
  const datas: IData[] = [
    {
      categoryLabel: "Basic statistics",
      datas: [...statisticsLabels, "total"].map((key) => ({
        comparisonKey: capitalize(key),
        values: characters.map(({ _id, statistics }) => ({
          id: _id,
          value: statistics[key as keyof IStatistics],
        })),
      })),
    },
    {
      categoryLabel: "Advanced statistics",
      datas: advancedStatisticsLabels.map((key) => ({
        comparisonKey: getAdvancedStatLabel(key),
        values: characters.map(({ _id, statistics }) => ({
          id: _id,
          value: statistics[key as keyof IStatistics],
        })),
      })),
    },
  ];

  return (
    <div
      className="fixed w-screen h-screen top-0 left-0 bg-black bg-opacity-70 z-[11]"
      onClick={() => close()}
    >
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-5 bg-white w-fit p-5 rounded"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-xl text-center mb-5 font-bold">
          Character comparison
        </p>
        <div className="flex gap-5 flex-wrap items-center justify-center">
          {characters.length > 4 ? (
            <div>
              You selected too many characters to compare. Please select up to 4
              characters.
            </div>
          ) : (
            <>
              <table className="rounded border">
                <thead>
                  <tr>
                    <th></th>
                    {characters.map(({ _id, name, imageUrl }) => (
                      <th
                        key={`compare-character-${_id}`}
                        className="px-2 border-x"
                      >
                        <div className="flex flex-col items-center">
                          {imageUrl && (
                            <Image
                              src={imageUrl}
                              alt={`${name} image`}
                              width={0}
                              height={0}
                              sizes="100vw"
                              style={{ width: "100px", height: "auto" }}
                            />
                          )}
                          <p className="font-bold">{name}</p>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {datas.map(({ categoryLabel, datas }) => {
                    const baseKey = `compare-character-category-${categoryLabel}`;
                    return (
                      <React.Fragment key={baseKey}>
                        <tr>
                          <td
                            colSpan={100}
                            className="text-center bg-gray-400 font-bold"
                          >
                            {categoryLabel}
                          </td>
                        </tr>
                        {datas.map(({ comparisonKey, values }) => {
                          const key = `${baseKey}-row-${comparisonKey}`;
                          const max = Math.max(
                            ...values.map(({ value }) => value)
                          );
                          const min = Math.min(
                            ...values.map(({ value }) => value)
                          );
                          return (
                            <tr
                              key={key}
                              className="border-b last-of-type:border-0"
                            >
                              <td className="px-2 border-r font-semibold">
                                {comparisonKey}
                              </td>
                              {values.map(({ id, value }) => (
                                <td
                                  key={`${key}-${id}`}
                                  className={`text-center border-r last-of-type:border-0 ${
                                    max === value
                                      ? "bg-green-300"
                                      : min === value
                                      ? "bg-red-300"
                                      : ""
                                  }`}
                                >
                                  {value}
                                </td>
                              ))}
                            </tr>
                          );
                        })}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
              {/* {characters.map(({ _id, name, imageUrl }) => (
                <div
                  key={`compare-character-${_id}`}
                  className="bg-gray-200 p-2 rounded flex flex-col gap-2 items-center"
                >
                  <div>
                    {imageUrl && (
                      <Image
                        src={imageUrl}
                        alt={`${name} image`}
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "100px", height: "auto" }}
                      />
                    )}
                  </div>
                  <p className="text-lg font-bold">{name}</p>
                  <div className=""></div>
                </div>
              ))} */}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CompareCharacters;
