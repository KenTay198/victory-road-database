"use client";
import { deleteCharacter } from "@/controllers/characters.controller";
import {
  ICompleteCharacter,
  ICompleteStatistics,
  IStatistics,
} from "@/types/character.types";
import Button from "@atoms/Button";
import { useConfirmModalState } from "@context/ConfirmModalContext";
import { useLoadingState } from "@context/LoadingContext";
import {
  advancedStatisticsLabels,
  elementDatas,
  hissatsuTypeDatas,
  statisticsLabels,
} from "@utils/variables";
import Image from "next/image";
import React from "react";
import { FaTrash } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";
import { toast } from "sonner";
import { Info } from "./CharacterTableFilters";
import Link from "next/link";

interface IProps {
  character: ICompleteCharacter;
  averages: ICompleteStatistics;
  info: Info;
}

function CharacterTableRow({ character, averages, info }: IProps) {
  const { showConfirm } = useConfirmModalState();
  const { setIsLoading } = useLoadingState();
  const {
    _id,
    firstName,
    lastName,
    element,
    statistics,
    hissatsus,
    archetypes,
  } = character;
  const name = `${firstName}${lastName ? " " + lastName : ""}`;

  const handleDelete = (id: string, name: string) => {
    showConfirm(
      "Delete a character",
      `Do you really want to delete "${name}" ?`,
      async () => {
        setIsLoading(true);
        try {
          await deleteCharacter(id);
          toast.success(`The character "${name}" has been deleted`);
        } catch (error) {
          console.log(error);
          toast.error("An error has occured while deleting the character");
        }
        setIsLoading(false);
      },
      { width: 600 }
    );
  };

  const displayColumns = () => {
    switch (info) {
      case "basic":
        return (
          <>
            {[...statisticsLabels, "total"].map((l) => {
              const key = l as keyof IStatistics;
              const value = statistics?.[key] || 0;
              const state = compareStatAverage(key, value);

              return (
                <td
                  key={`statistic-${_id}-${l}`}
                  className={`px-2 ${
                    state === "above"
                      ? "text-green-700"
                      : state === "below"
                      ? "text-red-700"
                      : ""
                  }`}
                >
                  {value}
                </td>
              );
            })}
          </>
        );
      case "advanced":
        return (
          <>
            {advancedStatisticsLabels.map((stat) => {
              const key = stat as keyof IStatistics;
              const value = statistics?.[key] || 0;
              const state = compareStatAverage(key, value);

              return (
                <td
                  key={`statistic-${_id}-${stat}`}
                  className={`px-2 ${
                    state === "above"
                      ? "text-green-700"
                      : state === "below"
                      ? "text-red-700"
                      : ""
                  }`}
                >
                  {value}
                </td>
              );
            })}{" "}
          </>
        );
      case "hissatsus":
        return (
          <>
            {hissatsus
              .sort((a, b) => a.learnLevel - b.learnLevel)
              .map(({ hissatsuId, learnLevel }) => {
                const id =
                  typeof hissatsuId === "string" ? hissatsuId : hissatsuId._id;
                const data =
                  typeof hissatsuId === "object" ? hissatsuId : undefined;
                const label = data
                  ? `${hissatsuTypeDatas[data.type].label} - ${
                      data.name
                    } (lvl. ${learnLevel})`
                  : "Inconnu";
                const element =
                  elementDatas[(data?.element || "") as keyof object];

                if (!data) return;

                return (
                  <td
                    style={{
                      color: element?.color,
                    }}
                    key={`statistic-${_id}-${id}`}
                    className="font-semibold"
                  >
                    <Link
                      href={`https://inazuma-eleven.fandom.com/fr/wiki/${data.name.replace(
                        " ",
                        "_"
                      )}`}
                      target="_blank"
                    >
                      {label}
                    </Link>
                  </td>
                );
              })}
            {[...Array(2 - hissatsus.length)].map((_e, i) => (
              <td key={`empty-hissatsu-${i}`}></td>
            ))}
          </>
        );
      default:
        break;
    }
  };

  const compareStatAverage = (
    key: keyof ICompleteStatistics,
    value: number
  ) => {
    const average = averages?.[key] || 0;
    if (value === 0 || value < average) return "below";
    if (value === average) return "equal";
    return "above";
  };

  return (
    <tr key={`character-${_id}`} className="border-b last-of-type:border-b-0">
      <td className="px-2 py-2">{name}</td>
      <td>
        <Image
          src={elementDatas[element].image}
          alt={"Element " + element}
          className="mx-auto"
          width={30}
        />
      </td>
      <td title={archetypes.join(", ")}>
        {archetypes.join(", ")}
      </td>
      {displayColumns()}
      <td>
        <div className="px-1 flex gap-1 items-center justify-center">
          <Button
            color="blue"
            href={"/characters/" + _id}
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

export default CharacterTableRow;
