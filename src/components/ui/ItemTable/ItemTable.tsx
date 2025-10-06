"use client";
import type React from "react";
import { useEffect, useState } from "react";
import ItemTableBody from "./ItemTableBody";
import ItemTableHeader from "./ItemTableHeader";
import { useTranslations } from "next-intl";
import Button from "@components/ui/Buttons/Button";
import ItemTableFilterBar from "./ItemTableFilterBar";

export type SortType = "string" | "number";
export type SortOrder = "asc" | "desc";

export interface ItemTableProperty {
  slug: string;
  label: string;
  sortType?: SortType;
  withCalculations?: boolean;
  className?: string;
  isSearchable?: boolean;
  nameAccessor?: string;
}

export interface SortState {
  property: string;
  order: SortOrder;
  sortType: SortType;
}

export type FilterComponentProps = {
  items: any[];
  onFilterChange: (items: any[]) => void;
};

interface IProps<T> extends React.HTMLAttributes<HTMLTableElement> {
  properties: ItemTableProperty[];
  items: T[];
  PropertyFormatter: ({ property, value }: { property: string; value: any }) => React.JSX.Element | null;
  FilterComponent: ({ items, onFilterChange }: FilterComponentProps) => React.JSX.Element | null;
  defaultSortProperty: string;
  functions?: {
    onItemClick?: (item: T) => void;
    onSelectedUpdate?: (items: T[]) => void;
    onCompare?: () => void;
  };
}

function ItemTable<T extends { id: string } = any>({
  className,
  items,
  properties,
  PropertyFormatter,
  FilterComponent,
  defaultSortProperty,
  functions,
  ...props
}: IProps<T>) {
  const t = useTranslations("common");
  const { onCompare, onSelectedUpdate } = functions || {};

  //#region Sorting
  const [sortState, setSortState] = useState<SortState | null>(null);
  useEffect(() => {
    if (sortState !== null) return;
    const defaultProperty = properties.find((p) => p.slug === defaultSortProperty);
    if (!defaultProperty || !defaultProperty.sortType) return;
    setSortState({
      property: defaultProperty.slug,
      order: "asc",
      sortType: defaultProperty.sortType,
    });
  }, [properties]);

  const handleSort = (property: string) => {
    const propertyConfig = properties.find((p) => p.slug === property);
    if (!propertyConfig?.sortType) return; // Don't sort if no sortType

    setSortState((prev) => ({
      property,
      order: prev?.property === property && prev.order === "asc" ? "desc" : "asc",
      sortType: propertyConfig.sortType as SortType,
    }));
  };
  //#endregion

  //#region Filtering
  const [filteredItems, setFilteredItems] = useState<T[]>(items);
  //#endregion

  //#region Selection
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  const handleSelect = (id: string) => {
    setSelectedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleSelectAll = (value: boolean) => {
    let selected: Set<string>;
    if (value) {
      selected = new Set(filteredItems.map((item) => item.id));
    } else {
      selected = new Set();
    }
    setSelectedItems(selected);
  };

  // Send selected items to parent
  useEffect(() => {
    if (onSelectedUpdate) onSelectedUpdate(items.filter((item) => selectedItems.has(item.id)));
  }, [selectedItems]);
  //#endregion

  if (!items?.length || !properties?.length) return null;

  const areItemsSelectable = Boolean(onSelectedUpdate);

  return (
    <div>
      <ItemTableFilterBar
        FilterComponent={FilterComponent}
        properties={properties}
        items={items}
        onFilterChange={setFilteredItems}
      />

      <div className="flex flex-wrap gap-4 mb-2">
        {onCompare && (
          <Button template="blue" size="S" disabled={selectedItems.size < 2} onClick={() => onCompare()}>
            {t("buttons.compare")}
          </Button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table {...props} className={["bordered rounded min-w-full", className].join(" ")}>
          <ItemTableHeader
            properties={properties}
            sortState={sortState}
            onSort={handleSort}
            allSelected={selectedItems.size > 0 && selectedItems.size === filteredItems.length}
            onSelectAll={handleSelectAll}
            areItemsSelectable={areItemsSelectable}
          />
          <ItemTableBody<T>
            items={filteredItems}
            properties={properties}
            PropertyFormatter={PropertyFormatter}
            sortState={sortState}
            selectedItems={selectedItems}
            areItemsSelectable={areItemsSelectable}
            functions={{
              onItemClick: functions?.onItemClick,
              onSelect: handleSelect,
            }}
          />
        </table>
      </div>
    </div>
  );
}

export default ItemTable;
