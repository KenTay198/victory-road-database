"use client";
import NumericHelpers, { type IStatisticDescriptions } from "@utils/helpers/numeric.helpers";
import type React from "react";
import { useEffect, useMemo, useState } from "react";
import type { ItemTableProperty, SortState } from "./ItemTable";
import ColorsHelper from "@utils/helpers/colors.helpers";
import { useTranslations } from "next-intl";

interface IProps<T> extends React.HTMLAttributes<HTMLTableSectionElement> {
  properties: ItemTableProperty[];
  items: T[];
  PropertyFormatter: ({ property, value }: { property: string; value: any }) => React.JSX.Element | null;
  sortState: SortState | null;
  selectedItems: Set<string>;
  areItemsSelectable: boolean;
  functions?: {
    onItemClick?: (item: T) => void;
    onSelect?: (id: string) => void;
  };
}

function ItemTableBody<T extends { id: any }>({
  className,
  items,
  properties,
  PropertyFormatter,
  sortState,
  functions,
  selectedItems,
  areItemsSelectable,
  ...props
}: IProps<T>) {
  const t = useTranslations("components.ui.itemTable");
  const [statisticDescriptions, setStatisticDescriptions] = useState<Record<string, IStatisticDescriptions>>({});
  const getPropertyValue = (item: T, property: string): any => {
    if (property.includes(".")) {
      const [parent, child] = property.split(".");
      return (item as any)[parent] ? (item as any)[parent][child] : "";
    }

    return item[property as keyof T];
  };

  useEffect(() => {
    if (!properties.some((p) => p.withCalculations)) return;
    const statDescriptions: Record<string, IStatisticDescriptions> = NumericHelpers.getStatDescriptionsByProperties(
      items,
      properties.filter((p) => p.withCalculations).map((p) => p.slug),
    );
    setStatisticDescriptions(statDescriptions);
  }, [properties, items]);

  const sortedItems = useMemo(() => {
    if (!sortState) return items;

    return [...items].sort((a, b) => {
      const aValue = getPropertyValue(a, sortState.property);
      const bValue = getPropertyValue(b, sortState.property);

      let comparison = 0;

      if (sortState.sortType === "string") {
        const aStr = String(aValue || "").toLowerCase();
        const bStr = String(bValue || "").toLowerCase();
        comparison = aStr.localeCompare(bStr);
      } else if (sortState.sortType === "number") {
        const aNum = Number(aValue) || 0;
        const bNum = Number(bValue) || 0;
        comparison = aNum - bNum;
      }

      return sortState.order === "desc" ? -comparison : comparison;
    });
  }, [items, sortState]);

  const handleSelect = (id: string) => {
    if (!functions?.onSelect) return;
    functions.onSelect(id);
  };

  return (
    <tbody {...props} className={["", className].join(" ")}>
      {sortedItems.length > 0 ? (
        sortedItems.map((item) => (
          <tr
            key={`item-row-${item.id}`}
            onClick={() => {
              if (functions?.onItemClick) functions.onItemClick(item);
            }}
            className={functions?.onItemClick ? "duration-200 hover:bg-gray-200 cursor-pointer" : ""}
          >
            {areItemsSelectable && (
              <td
                className="text-center"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect(item.id);
                }}
                onKeyUp={(e) => {
                  e.stopPropagation();
                  handleSelect(item.id);
                }}
              >
                <input
                  type="checkbox"
                  name={`item-${item.id}`}
                  id={`item-${item.id}`}
                  checked={selectedItems.has(item.id)}
                  onClick={(e) => e.stopPropagation()}
                  onKeyUp={(e) => e.stopPropagation()}
                  onChange={() => handleSelect(item.id)}
                />
              </td>
            )}
            {properties.map(({ slug, className }) => {
              const value = getPropertyValue(item, slug);
              const statDescription = statisticDescriptions[slug];
              const color = ColorsHelper.getColorByTier(value, statDescription);
              return (
                <td key={slug}>
                  <div
                    style={{ color }}
                    className={`w-fit text-center whitespace-nowrap ${color ? `font-bold` : ""} ${className || ""}`}
                  >
                    <PropertyFormatter property={slug} value={getPropertyValue(item, slug)} />
                  </div>
                </td>
              );
            })}
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={properties.length + (areItemsSelectable ? 1 : 0)} className="text-center p-4">
            {t("noItems")}
          </td>
        </tr>
      )}
    </tbody>
  );
}

export default ItemTableBody;
