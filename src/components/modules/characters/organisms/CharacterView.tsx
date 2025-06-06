"use client";
import { ICompleteCharacter, IStatistics } from "@/types/character.types";
import { capitalize } from "@utils/functions";
import React from "react";
import {
  advancedStatisticsLabels,
  elementDatas,
  hissatsuTypeDatas,
  statisticsLabels,
} from "@utils/variables";
import Image from "next/image";
import Link from "next/link";
import ElementImage from "@atoms/ElementImage";
import { getAdvancedStatLabel } from "@utils/characters.functions";

function CharacterView({ character }: { character: ICompleteCharacter }) {
  const {
    firstName,
    lastName,
    element,
    statistics,
    defaultPosition,
    hissatsus,
    imageUrl,
    archetypes,
  } = character;

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
          <ElementImage element={element} />
          <p>{capitalize(element)}</p>
        </div>
        <p>
          <span className="font-semibold">Default position : </span>
          {capitalize(defaultPosition)}
        </p>
        <p className="max-w-[450px]">
          <span className="font-semibold">Archetypes : </span>
          {archetypes.map((e) => capitalize(e)).join(" / ")}
        </p>
        <p className="font-semibold">Statistics</p>
        {statistics && (
          <div className="flex flex-wrap gap-5 text-base">
            <div>
              <p className="font-semibold mb-1">Base statistics</p>
              <ul className="pl-8 border-l list-disc flex-1">
                {statisticsLabels.map((stat) => (
                  <li key={"statistic-" + stat}>
                    {capitalize(stat)} : {statistics[stat as keyof IStatistics]}
                  </li>
                ))}
                <li>Total statistics : {statistics.total}</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-1">Advanced statistics</p>
              <ul className="pl-8 border-l list-disc flex-1">
                {advancedStatisticsLabels.map((stat) => (
                  <li key={"statistic-" + stat}>
                    {getAdvancedStatLabel(stat)} :{" "}
                    {statistics[stat as keyof IStatistics]}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
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
