import { capitalize } from "@utils/functions";
import React from "react";
import { elementDatas } from "@utils/variables";
import Image from "next/image";
import IHissatsu from "@/types/hissatsu.types";

function HissatsuView({ hissatsu }: { hissatsu: IHissatsu }) {
  const { name, element, type, characteristic } = hissatsu;

  return (
    <div className="flex flex-row-reverse justify-end flex-wrap gap-10">
      <div className="max-w-[1000px] flex flex-col gap-1 text-lg">
        <p>
          <span className="font-semibold">Name : </span> {name}
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
          <span className="font-semibold">Type : </span>
          {capitalize(type)}
        </p>
        {characteristic && (
          <p>
            <span className="font-semibold">Characteristic : </span>
            {capitalize(characteristic)}
          </p>
        )}
      </div>
    </div>
  );
}

export default HissatsuView;
