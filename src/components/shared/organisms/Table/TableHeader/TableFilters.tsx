"use client";
import { IOption } from "@/types/types";
import CheckboxGroup from "@atoms/Inputs/CheckboxGroup";
import RadioGroup from "@atoms/Inputs/RadioGroup";
import TextInput from "@atoms/Inputs/TextInput";
import { capitalize } from "@utils/functions";
import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export interface IFilter {
  key: string;
  label?: string;
  type: "checkbox" | "radio";
  options: IOption[];
}

interface IProps {
  value: any;
  handleChange: (val: any) => void;
  query: string;
  handleChangeQuery: (val: string) => void;
  tab?: string;
  handleChangeTab?: (val: string) => void;
  tabs?: IOption[];
  filters?: IFilter[];
  itemName?: string;
}

function TableFilters({
  value,
  handleChange,
  filters,
  query,
  handleChangeQuery,
  itemName,
  tabs,
  tab,
  handleChangeTab,
}: IProps) {
  const [expanded, setExpanded] = useState(false);

  const ExpandIcon = expanded ? FaChevronUp : FaChevronDown;

  const displayInput = ({ key, type, label, options }: IFilter) => {
    switch (type) {
      case "checkbox":
        return (
          <CheckboxGroup
            id={`filters-${key}`}
            label={label || capitalize(key)}
            options={options || []}
            value={value[key as keyof object] || []}
            handleChange={(val) => handleChange({ ...value, [key]: val })}
            allOptions
          />
        );
      case "radio":
        return (
          <RadioGroup
            id={`filters-${key}`}
            label={label || capitalize(key)}
            options={options || []}
            value={value[key as keyof object] || []}
            handleChange={(val) => handleChange({ ...value, [key]: val })}
          />
        );
      default:
        break;
    }
  };

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
        {filters && expanded && (
          <>
            {filters.map((filter) => (
              <React.Fragment key={`filters-${filter.key}`}>
                {displayInput(filter)}
              </React.Fragment>
            ))}
            {tabs && (
              <RadioGroup
                id="filters-tabs"
                label="Displayed infos"
                options={tabs}
                value={tab || ""}
                handleChange={(val) => {
                  if (handleChangeTab) handleChangeTab(val);
                }}
              />
            )}
          </>
        )}
      </div>
      <TextInput
        id={`${capitalize(itemName || "data")} search`}
        placeholder={`Search ${itemName || "data"}...`}
        divClassName="max-w-[500px] w-full mb-2"
        value={query}
        handleChange={(query) => handleChangeQuery(query)}
      />
    </>
  );
}

export default TableFilters;
