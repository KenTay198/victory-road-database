import React from "react";
import { ICompleteCharacter } from "@/types/models/character.types";
import { elementDatas } from "@utils/variables";
import { capitalize } from "@utils/functions";
import Link from "next/link";
import Image from "next/image";

interface IProps {
  character: ICompleteCharacter;
}

function CharacterCard({ character }: IProps) {
  const { _id, firstName, lastName, element, defaultPosition, imageUrl } = character;
  const elementData = elementDatas[element];
  const fullName = `${firstName}${lastName ? ` ${lastName}` : ""}`;

  return (
    <Link
      href={`/characters/${_id}`}
      className="w-48 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group"
    >
      <div className="relative h-48 bg-gray-100 dark:bg-gray-700">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={fullName}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="192px"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            <span className="text-4xl font-bold">{firstName[0]?.toUpperCase()}</span>
          </div>
        )}

        <div
          className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center shadow-md"
          style={{ backgroundColor: elementData?.color || "#gray" }}
        >
          {elementData?.image ? (
            <Image src={elementData.image} alt={element} width={20} height={20} className="w-5 h-5" />
          ) : (
            <span className="text-white text-xs font-bold">{element[0]?.toUpperCase()}</span>
          )}
        </div>
      </div>

      <div className="p-3">
        <h3 className="font-semibold text-base text-gray-900 dark:text-white mb-2 line-clamp-2">{fullName}</h3>

        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <span className="capitalize text-xs">{capitalize(defaultPosition)}</span>
          <span className="px-2 py-1 rounded-full text-white text-xs font-medium" style={{ backgroundColor: elementData?.color || "#gray" }}>
            {capitalize(element)}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default CharacterCard;
