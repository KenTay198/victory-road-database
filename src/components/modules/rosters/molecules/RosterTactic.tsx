"use client";
import Image from "next/image";
import React, { HTMLAttributes, useEffect, useMemo, useState } from "react";
import Court from "@images/rosters/court.png";
import { IRoster } from "@/types/models/roster.types";
import { FaPlus } from "react-icons/fa";
import { IComposition, ILinePosition } from "@/types/types";
import SelectInput from "@atoms/Inputs/SelectInput";
import compositions from "@/datas/compositions";
import { Position } from "@/types/models/character.types";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  roster: IRoster;
}

interface IFilteredCharacter {
  name: string;
  imageUrl?: string;
  _id: string;
  placed: boolean;
}

type Line = (IFilteredCharacter | undefined)[];

const RosterTactic = ({ roster, ...props }: IProps) => {
  const [selectedComposition, setSelectedComposition] = useState<
    IComposition<any> | undefined
  >();
  const [selectedCharacter, setSelectedCharacter] = useState<
    IFilteredCharacter | undefined
  >(undefined);
  const [tactic, setTactic] = useState<ILinePosition<IFilteredCharacter>[][]>(
    []
  );
  const [bench, setBench] = useState<Line>(Array(5).fill(undefined));
  const { characters } = roster;
  const filteredCharacters = useMemo(() => {
    const chars: IFilteredCharacter[] = [];

    for (const c of characters) {
      if (typeof c === "string") continue;
      const { firstName, lastName, imageUrl, _id } = c;
      const placed =
        tactic.some((line) =>
          line.some(({ character }) => character?._id === c._id)
        ) || bench.some((chara) => chara?._id === c._id);
      const name = `${firstName}${lastName ? " " + lastName : ""}`;
      chars.push({ name, imageUrl, _id, placed });
    }

    return chars.sort((a, b) => Number(a.placed) - Number(b.placed));
  }, [characters, tactic, bench]);

  useEffect(() => {
    if (!selectedComposition) return;
    setTactic(selectedComposition.lines);
  }, [selectedComposition]);

  const getColorByPosition = (position: Position) => {
    switch (position) {
      case "goalkeeper":
        return "orange";
      case "defender":
        return "green";
      case "midfielder":
        return "blue";
      case "forward":
        return "red";
      default:
        return "white";
    }
  };

  const handleSelectCharacter = (character: IFilteredCharacter) => {
    setSelectedCharacter(
      selectedCharacter?._id === character._id ? undefined : character
    );
  };

  const handlePlaceCharacter = (line: number | "bench", position: number) => {
    if (selectedCharacter) {
      setTactic((prev) =>
        prev.map((l) =>
          l.map((e) =>
            e.character?._id === selectedCharacter._id
              ? { ...e, character: undefined }
              : e
          )
        )
      );
      setBench((prev) =>
        prev.map((c) => (c?._id === selectedCharacter._id ? undefined : c))
      );
    }

    if (line === "bench") {
      setBench((prevTactic) =>
        prevTactic.map((e, i) => (i === position ? selectedCharacter : e))
      );
    } else {
      setTactic((prev) =>
        prev.map((l, lNum) =>
          lNum !== line
            ? l
            : l.map((e, i) =>
                i === position ? { ...e, character: selectedCharacter } : e
              )
        )
      );
    }

    setSelectedCharacter(undefined);
  };

  return (
    <div {...props}>
      <SelectInput
        id="compositions"
        options={compositions.map(({ name, type }) => ({
          value: name,
          label: `${type} : ${name}`,
        }))}
        handleChange={(val) => {
          const option = compositions.find(({ name }) => name === val);
          setSelectedComposition(option);
        }}
        withEmptyOption
      />
      <div className="flex flex-wrap gap-2 mb-5">
        {filteredCharacters.map((c) => {
          const { imageUrl, name, placed } = c;
          const selected = selectedCharacter?._id === c._id;

          return (
            <div
              key={`character-${name}`}
              onClick={() => handleSelectCharacter(c)}
              className={`cursor-pointer w-fit border-2 rounded overflow-hidden ${
                selected ? "border-black/60" : "border-transparent"
              } ${placed ? "grayscale" : ""}`}
            >
              <Image
                src={imageUrl || ""}
                alt={`Photo of ${name}`}
                width={100}
                height={100 * 1.14}
              />
            </div>
          );
        })}
      </div>

      <div className="relative w-fit">
        <Image src={Court} alt="Empty court" height={700} />
        {tactic.map((line, lineNumber) => {
          const key = `line-${lineNumber}`;
          const bottom = (lineNumber / tactic.length) * 100 + 1 + "%";

          return (
            <div
              style={{ bottom, height: 75 * 1.14 }}
              key={key}
              className="absolute left-0 w-full flex justify-around"
            >
              {line.map(({ character, position, type, ...rest }, pos) => {
                const positionMultiplier = rest.positionMultiplier || 1;
                const color = getColorByPosition(type);

                return (
                  <div
                    style={{
                      width: 75,
                      height: 75 * 1.14,
                      backgroundColor : color,
                      transform:
                        position === "base"
                          ? ""
                          : `translateY(${position === "forward" ? "-" : ""}${
                              50 * positionMultiplier
                            }%)`,
                    }}
                    key={`${key}-position-${pos}`}
                    className={`flex justify-center items-center rounded border-2 border-white text-white  ${
                      selectedCharacter ? "border-dashed" : ""
                    }`}
                    onClick={() => handlePlaceCharacter(lineNumber, pos)}
                  >
                    {character ? (
                      <Image
                        src={character.imageUrl || ""}
                        alt={`Photo of ${character.name}`}
                        width={100}
                        height={100 * 1.14}
                      />
                    ) : (
                      <FaPlus size={20} />
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
        <Bench
          bench={bench}
          selected={!!selectedCharacter}
          handlePlaceCharacter={handlePlaceCharacter}
        />
      </div>
    </div>
  );
};

interface IBenchProps {
  bench: Line;
  selected: boolean;
  handlePlaceCharacter: (line: "bench", position: number) => void;
}

const Bench = ({ bench, selected, handlePlaceCharacter }: IBenchProps) => {
  return (
    <div className="absolute left-[105%] top-0 flex flex-col gap-2">
      {bench.map((e, i) => {
        return (
          <div
            style={{ width: 75, height: 75 * 1.14 }}
            key={`bench-${i}`}
            className={`flex justify-center items-center rounded border-2 border-white text-white bg-black ${
              selected ? "border-dashed" : ""
            }`}
            onClick={() => handlePlaceCharacter("bench", i)}
          >
            {e ? (
              <Image
                src={e.imageUrl || ""}
                alt={`Photo of ${e.name}`}
                width={100}
                height={100 * 1.14}
              />
            ) : (
              <FaPlus size={20} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default RosterTactic;
