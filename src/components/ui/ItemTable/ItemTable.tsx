"use client";
import type React from "react";
import { useEffect, useState } from "react";
import ItemTableBody from "./ItemTableBody";
import ItemTableHeader from "./ItemTableHeader";
import { useTranslations } from "next-intl";
import Button from "@components/ui/Buttons/Button";

export type SortType = "string" | "number";
export type SortOrder = "asc" | "desc";

export interface ItemTableProperty {
  slug: string;
  label: string;
  sortType?: SortType;
  withCalculations?: boolean;
}

export interface SortState {
  property: string;
  order: SortOrder;
  sortType: SortType;
}

interface IProps<T> extends React.HTMLAttributes<HTMLTableElement> {
  properties: ItemTableProperty[];
  items: T[];
  PropertyFormatter: ({ property, value }: { property: string; value: any }) => React.JSX.Element | null;
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
  defaultSortProperty,
  functions,
  ...props
}: IProps<T>) {
  const t = useTranslations("common");
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
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
      selected = new Set(items.map((item) => item.id));
    } else {
      selected = new Set();
    }
    setSelectedItems(selected);
  };

  useEffect(() => {
    if (functions?.onSelectedUpdate) functions?.onSelectedUpdate(items.filter((item) => selectedItems.has(item.id)));
  }, [selectedItems]);

  const { onCompare } = functions || {};

  if (!items?.length || !properties?.length) return null;

  return (
    <div className="overflow-auto">
      <div className="flex flex-wrap gap-4 mb-2">
        {onCompare && (
          <Button template="blue" size="S" disabled={selectedItems.size < 2} onClick={() => onCompare()}>
            {t("buttons.compare")}
          </Button>
        )}
      </div>
      <table {...props} className={["bordered rounded min-w-full", className].join(" ")}>
        <ItemTableHeader
          properties={properties}
          sortState={sortState}
          onSort={handleSort}
          allSelected={selectedItems.size === items.length}
          onSelectAll={handleSelectAll}
        />
        <ItemTableBody<T>
          items={items}
          properties={properties}
          PropertyFormatter={PropertyFormatter}
          sortState={sortState}
          functions={{
            onItemClick: functions?.onItemClick,
            onSelect: handleSelect,
          }}
          selectedItems={selectedItems}
        />
      </table>
    </div>
  );
}

export default ItemTable;
