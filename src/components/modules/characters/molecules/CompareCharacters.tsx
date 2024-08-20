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
  const charactersMax = 6;
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
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 w-full flex items-center justify-center">
        <div
          className="rounded p-5 bg-white max-w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <p className="text-xl text-center mb-5 font-bold">
            Character comparison
          </p>
          {characters.length > charactersMax ? (
            <div>
              You selected too many characters to compare. Please select up to{" "}
              {charactersMax} characters.
            </div>
          ) : (
            <div
              style={{ width: `${140 * (characters.length + 1)}px` }}
              className="max-w-full overflow-auto"
            >
              <div className="w-fit mx-auto">
                <table className="border">
                  <thead>
                    <tr className="border-b">
                      <th></th>
                      {characters.map(({ _id, name, imageUrl }) => (
                        <th
                          key={`compare-character-image-${_id}`}
                          className="px-2 border-x"
                        >
                          <div
                            style={{ width: "120px", height: "auto" }}
                            className="flex flex-col items-center"
                          >
                            {imageUrl && (
                              <Image
                                src={imageUrl}
                                alt={`${name} image`}
                                // layout="responsive"
                                unoptimized
                                width={0}
                                height={0}
                                // sizes="100vw"
                                className="flex-1 h-full w-auto"
                                // style={{ width: "auto", height: "100%" }}
                              />
                            )}
                          </div>
                        </th>
                      ))}
                    </tr>
                    <tr>
                      <th></th>
                      {characters.map(({ _id, name }) => (
                        <th
                          key={`compare-character-name-${_id}`}
                          className="px-2 border-x"
                        >
                          <p>{name}</p>
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
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CompareCharacters;
