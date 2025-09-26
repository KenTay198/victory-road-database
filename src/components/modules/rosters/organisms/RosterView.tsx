import React from "react";
import { IRoster } from "@/types/models/roster.types";
import ElementImage from "@atoms/ElementImage";
import { capitalize } from "@utils/functions";
import { positions } from "@utils/variables";

function RosterView({ roster }: { roster: IRoster }) {
  const { name, characters } = roster;

  return (
    <>
      <div className="max-w-[1000px] flex flex-col gap-1 text-lg">
        <p>
          <span className="font-semibold">Name : </span> {name}
        </p>
      </div>
      <div className="flex flex-wrap">
        <div>
          <p className="font-semibold text-lg">Characters</p>
          <ul className="pl-5">
            {characters
              .sort((a, b) => {
                if (typeof a === "string" || typeof b === "string") return 1;
                return (
                  positions.findIndex((pos) => pos === a.defaultPosition) -
                  positions.findIndex((pos) => pos === b.defaultPosition)
                );
              })
              .map((c) => {
                const id = typeof c === "object" ? c._id : c;
                const key = `characters-${id}`;
                if (typeof c === "string") return <li key={key}>{c}</li>;
                const { firstName, lastName, defaultPosition, element } = c;
                const name = `${firstName}${lastName ? " " + lastName : ""}`;
                return (
                  <li
                    className="font-semibold flex gap-1 items-center mb-2"
                    key={key}
                  >
                    <ElementImage element={element} />
                    <p>
                      {name} - {capitalize(defaultPosition)}
                    </p>
                  </li>
                );
              })}
          </ul>
        </div>

      </div>
    </>
  );
}

export default RosterView;
