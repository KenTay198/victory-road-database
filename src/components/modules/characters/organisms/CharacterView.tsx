"use client";
import {
  ICharacter,
  ICompleteStatistics,
  IStatistics,
} from "@/types/character.types";
import { capitalize, getAdvancedStats } from "@utils/functions";
import React, { useEffect, useState } from "react";
import {
  advancedStatisticsLabels,
  elementDatas,
  hissatsuTypeDatas,
  statisticsLabels,
} from "@utils/variables";
import Image from "next/image";
import Link from "next/link";

function CharacterView({ character }: { character: ICharacter }) {
  const [totalStats, setTotalStats] = useState<number>();
  const [completeStatistics, setCompleteStatistics] = useState<
    ICompleteStatistics | undefined
  >();
  const {
    firstName,
    lastName,
    element,
    statistics,
    defaultPosition,
    hissatsus,
    imageUrl,
  } = character;

  useEffect(() => {
    const completeStats = getAdvancedStats(statistics);
    setCompleteStatistics(completeStats);
    setTotalStats(() => {
      if (!statistics) return 0;
      return Object.values(statistics).reduce(
        (acc: number, curr: number) => acc + parseInt(curr.toString()) || 0,
        0
      );
    });
  }, [statistics]);

  return (
    <div className="flex flex-row-reverse justify-end flex-wrap gap-10">
      {imageUrl && (
        <div>
          <Image
            src={imageUrl}
            alt={`${firstName} image`}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "250px", height: "auto" }}
          />
        </div>
      )}
      <div className="max-w-[1000px] flex flex-col gap-1 text-lg">
        <p>
          <span className="font-semibold">First name : </span> {firstName}
        </p>
        <p>
          <span className="font-semibold">Last name : </span> {lastName}
        </p>
        <div className="flex items-end gap-1">
          <p>
            <span className="font-semibold">Element : </span>
          </p>
          <Image
            src={elementDatas[element].image}
            alt={`Element ${element}`}
            width={25}
            height={25}
          />
          <p>{capitalize(element)}</p>
        </div>
        <p>
          <span className="font-semibold">Default position : </span>
          {capitalize(defaultPosition)}
        </p>
        <p className="font-semibold">Statistics</p>
        <div className="flex flex-wrap gap-5 text-base">
          <div>
            <p className="font-semibold mb-1">Base statistics</p>
            <ul className="pl-8 border-l list-disc flex-1">
              {statisticsLabels.map((stat) => (
                <li key={"statistic-" + stat}>
                  {capitalize(stat)} : {statistics[stat as keyof IStatistics]}
                </li>
              ))}
              <li>Total statistics : {totalStats}</li>
            </ul>
          </div>
          {completeStatistics && (
            <div>
              <p className="font-semibold mb-1">Advanced statistics</p>
              <ul className="pl-8 border-l list-disc flex-1">
                {advancedStatisticsLabels.map((stat) => {
                  const parts = stat.split("-");
                  const label =
                    parts.length > 1
                      ? `${capitalize(parts[0])} ${parts[1].toUpperCase()}`
                      : parts[0].toUpperCase();
                  return (
                    <li key={"statistic-" + stat}>
                      {label} : {completeStatistics[stat as keyof IStatistics]}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
        <div>
          <p className="font-semibold text-lg">Hissatsus</p>
          <ul className="pl-5 list-disc">
            {hissatsus.map(({ hissatsuId, learnLevel }) => {
              const id =
                typeof hissatsuId === "object" ? hissatsuId._id : hissatsuId;
              const data =
                typeof hissatsuId === "object" ? hissatsuId : undefined;
              const label = data
                ? `${hissatsuTypeDatas[data.type].label} - ${
                    data.name
                  } (lvl. ${learnLevel})`
                : "Inconnu";
              const element =
                elementDatas[(data?.element || "") as keyof object];
              const href = `https://inazuma-eleven.fandom.com/fr/wiki/${
                data?.name.replace(" ", "_") || ""
              }`;
              return (
                <li
                  style={{
                    color: element?.color,
                  }}
                  className="font-semibold duration-200 hover:brightness-75"
                  key={`hissatsu-${id}`}
                >
                  <Link href={href} target="_blank">
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CharacterView;
