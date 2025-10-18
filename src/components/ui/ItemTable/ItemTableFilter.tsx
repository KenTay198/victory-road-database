"use client";
import type React from "react";
import CheckboxGroup from "../Inputs/CheckboxGroup";
import RadioGroup from "../Inputs/RadioGroup";

export type ItemTableFilterProperty = {
  slug: string;
  title: string;
  options: { value: string; label: string }[];
  isMultiple?: boolean;
};

interface IProps<T> extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  properties: ItemTableFilterProperty[];
  filters: T;
  onFilterChange: (filters: T) => void;
}

const ItemTableFilter = <T extends Record<string, any>>({
  className,
  filters,
  onFilterChange,
  properties,
  ...props
}: IProps<T>) => {
  const handleChange = (property: string, value: any) => {
    onFilterChange({ ...filters, [property]: value });
  };

  return (
    <div {...props} className={["bg-raimon-blue-dark text-white p-2 rounded-lg space-y-2", className].join(" ")}>
      {properties.map((property) => {
        const id = `${props.id}-filters-${property.slug}`;
        return (
          <div key={id} className="max-w-full">
            <p className="font-bold">{property.title}:</p>
            {property.isMultiple ? (
              <CheckboxGroup
                key={id}
                id={id}
                values={filters[property.slug] || []}
                options={property.options}
                className="flex flex-wrap gap-4"
                checkboxGap={4}
                handleChange={(values: string[]) => handleChange(property.slug, values)}
              />
            ) : (
              <RadioGroup
                key={id}
                id={id}
                value={filters[property.slug] || ""}
                options={property.options}
                handleChange={(value: string) => handleChange(property.slug, value)}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ItemTableFilter;
