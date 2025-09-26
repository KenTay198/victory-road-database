"use client";
import { IOption } from "@/types/types";
import CheckboxGroup from "@atoms/Inputs/CheckboxGroup";
import RadioGroup from "@atoms/Inputs/RadioGroup";
import TextInput from "@atoms/Inputs/TextInput";
import { capitalize } from "@utils/functions";
import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import useClickOutside from "@/hooks/useClickOutside";

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
  itemName: string;
}

function TableFilters({ value, handleChange, filters, query, handleChangeQuery, itemName, tabs, tab, handleChangeTab }: IProps) {
  const [expanded, setExpanded] = useState(false);

  const filtersRef = useClickOutside<HTMLDivElement>({
    onClickOutside: () => setExpanded(false),
    togglerElementId: "filters-toggler",
  });

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
      {filters && (
        <div className="bg-gray-200 mb-2 p-2 rounded w-fit relative" ref={filtersRef}>
          <div
            id="filters-toggler"
            className="flex items-center gap-3 cursor-pointer border-b border-b-gray-500"
            onClick={() => setExpanded(!expanded)}
          >
            <p className="font-semibold text-lg">Filters</p>
            <ExpandIcon />
          </div>
          {expanded && (
            <div className="p-2 absolute top-[105%] left-0 rounded bg-gray-200 w-screen max-w-[1000px] z-[2]">
              <div className="w-full">
                {filters.map((filter) => (
                  <React.Fragment key={`filters-${filter.key}`}>{displayInput(filter)}</React.Fragment>
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
              </div>
            </div>
          )}
        </div>
      )}
      <TextInput
        id={`${capitalize(itemName)} search`}
        placeholder={`Search ${itemName}...`}
        divClassName="max-w-[500px] w-full mb-2"
        value={query}
        handleChange={(query) => handleChangeQuery(query)}
      />
    </>
  );
}

export default TableFilters;
