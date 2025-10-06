"use client";
import type React from "react";
import { useState } from "react";
import TextInput from "../Inputs/Text";
import { useTranslations } from "next-intl";
import Button from "../Buttons/Button";
import { FaSliders } from "react-icons/fa6";
import type { FilterComponentProps, ItemTableProperty } from "./ItemTable";

export interface IItemTableFilter {
  query: string;
}

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  properties: ItemTableProperty[];
  items: any[];
  onFilterChange: (items: any[]) => void;
  FilterComponent: (props: FilterComponentProps) => React.JSX.Element | null;
}

const ItemTableFilterBar = ({ className, items, onFilterChange, properties, FilterComponent, ...props }: IProps) => {
  const [filtersExpanded, setFiltersExpanded] = useState(false);
  const [query, setQuery] = useState("");
  const t = useTranslations("components.ui.itemTable");

  const getPropertyValue = (item: any, property: string, nameAccessor?: string): any => {
    let value: any;
    if (property.includes(".")) {
      const [parent, child] = property.split(".");
      value = (item as any)[parent] ? (item as any)[parent][child] : "";
    } else {
      value = item[property as keyof object];
    }
    if (nameAccessor && value && typeof value === "object") {
      return (value as any)[nameAccessor] || "";
    }
    return value;
  };

  const filterByQuery = (items: any[], query: string): any[] => {
    const trimmedQuery = query.trim().toLowerCase();
    const filteredItems = !trimmedQuery
      ? items
      : items.filter((item) => {
          const query = trimmedQuery;
          return properties
            .filter(({ isSearchable }) => isSearchable)
            .some((property) => {
              const value = getPropertyValue(item, property.slug, property.nameAccessor);
              if (value === null || value === undefined) return false;
              return String(value).toLowerCase().includes(query);
            });
        });

    return filteredItems;
  };

  const handleQueryChange = (value: string) => {
    setQuery(value);
    onFilterChange(filterByQuery(items, value));
  };

  const handleFiltersChange = (items: any[]) => {
    onFilterChange(filterByQuery(items, query));
  };

  return (
    <div {...props} className={["mb-4 my-2", className].join(" ")}>
      <div className={["mb-4 flex items-center gap-4", className].join(" ")}>
        <Button
          template="darkBlue"
          size="S"
          Icon={FaSliders}
          onClick={() => setFiltersExpanded(!filtersExpanded)}
          active={filtersExpanded}
        >
          {t("buttons.filters")}
        </Button>
        <TextInput
          id="query"
          type="text"
          className="flex-1"
          value={query}
          placeholder={t("inputs.search.placeholder")}
          handleChange={handleQueryChange}
        />
      </div>
      {filtersExpanded && <FilterComponent items={items} onFilterChange={handleFiltersChange} />}
    </div>
  );
};

export default ItemTableFilterBar;
