import CheckboxGroup from "@atoms/Inputs/CheckboxGroup";
import RadioGroup from "@atoms/Inputs/RadioGroup";
import TextInput from "@atoms/Inputs/TextInput";
import { capitalize } from "@utils/functions";
import { archetypes, elements, positions } from "@utils/variables";
import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export type Info = "basic" | "advanced" | "hissatsus";

export interface ICharacterFilters {
  info: "basic" | "advanced" | "hissatsus";
  positions: string[];
  elements: string[];
  archetypes: string[];
  query: string;
}

interface IProps {
  filters: ICharacterFilters;
  handleChange: (val: ICharacterFilters) => void;
}

function CharacterTableFilters({ filters, handleChange }: IProps) {
  const [expanded, setExpanded] = useState(false);

  const ExpandIcon = expanded ? FaChevronUp : FaChevronDown;

  return (
    <>
      <div className="bg-gray-300 mb-2 p-2 rounded w-fit">
        <div
          className="flex items-center gap-3 cursor-pointer border-b"
          onClick={() => setExpanded(!expanded)}
        >
          <p className="font-semibold text-lg">Filters</p>
          <ExpandIcon />
        </div>
        {expanded && (
          <>
            <CheckboxGroup
              id="filters-positions"
              label="Positions"
              options={positions.map((p) => ({
                value: p,
                label: capitalize(p),
              }))}
              value={filters.positions || []}
              handleChange={(positions) =>
                handleChange({ ...filters, positions })
              }
              allOptions
            />
            <CheckboxGroup
              id="filters-elements"
              label="Elements"
              options={elements
                .filter((e) => e !== "void")
                .map((p) => ({ value: p, label: capitalize(p) }))}
              value={filters.elements || []}
              handleChange={(elements) =>
                handleChange({ ...filters, elements })
              }
              allOptions
            />
            <CheckboxGroup
              id="filters-archetypes"
              label="Archetypes"
              options={archetypes
                .filter((e) => e !== "void")
                .map((p) => ({ value: p, label: capitalize(p) }))}
              value={filters.archetypes || []}
              handleChange={(archetypes) =>
                handleChange({ ...filters, archetypes })
              }
              allOptions
            />
            <RadioGroup
              id="filters-info"
              label="Displayed infos"
              options={[
                { value: "basic", label: "Basic stats" },
                { value: "advanced", label: "Advanced stats" },
                { value: "hissatsus", label: "Hissatsus" },
              ]}
              value={filters.info || ""}
              handleChange={(val) =>
                handleChange({ ...filters, info: val as Info })
              }
            />
          </>
        )}
      </div>
      <TextInput
        id="Character search"
        placeholder="Search character..."
        divClassName="max-w-[500px] w-full mb-2"
        value={filters.query}
        handleChange={(query) => handleChange({ ...filters, query })}
      />
    </>
  );
}

export default CharacterTableFilters;
