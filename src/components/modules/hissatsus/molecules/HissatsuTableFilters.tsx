import { hissatsuCharacteristics, hissatsuTypes } from "@/types/hissatsu.types";
import CheckboxGroup from "@atoms/Inputs/CheckboxGroup";
import TextInput from "@atoms/Inputs/TextInput";
import { capitalize } from "@utils/functions";
import { elements } from "@utils/variables";
import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export interface IHissatsuFilters {
  characteristics: string[];
  types: string[];
  elements: string[];
  query: string;
}

interface IProps {
  filters: IHissatsuFilters;
  handleChange: (val: IHissatsuFilters) => void;
}

function HissatsuTableFilters({ filters, handleChange }: IProps) {
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
              id="filters-type"
              label="Types"
              options={hissatsuTypes.map((p) => ({
                value: p,
                label: capitalize(p),
              }))}
              value={filters.types || []}
              handleChange={(type) => handleChange({ ...filters, types: type })}
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
              id="filters-characteristic"
              label="Characteristics"
              options={[...hissatsuCharacteristics, "none"]
                .filter((e) => e !== "void")
                .map((p) => ({ value: p, label: capitalize(p) }))}
              value={filters.characteristics || []}
              handleChange={(characteristic) =>
                handleChange({ ...filters, characteristics: characteristic })
              }
              allOptions
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

export default HissatsuTableFilters;
