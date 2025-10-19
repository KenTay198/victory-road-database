"use client";
import type React from "react";
import ItemTable, { type ItemTableProperty } from "@components/ui/ItemTable/ItemTable";
import { useTranslations } from "next-intl";
import { useSettings } from "@context/SettingsContext";
import type { IHissatsu } from "@hissatsu/hissatsu.types";
import Hissatsu from "@hissatsu/hissatsu.entity";
import HissatsuPropertyFormatter from "../HissatsuPropertyFormatter";
import HissatsuFilters from "./HissatsuFilters";
import HissatsuActionBar from "./HissatsuActionBar";
import { useRouter } from "next/navigation";

interface IProps extends React.HTMLAttributes<HTMLTableElement> {
  hissatsus: IHissatsu[];
}

const HissatsuTable = ({ className, hissatsus, ...props }: IProps) => {
  const { settings } = useSettings();
  const router = useRouter();
  const t = useTranslations("hissatsu");
  const hissatsuEntities = hissatsus.map((h) => {
    const hissatsu = Hissatsu.fromJSON(h);
    hissatsu.setLocalizedName(settings.hissatsuLocale);
    return hissatsu;
  });

  const searchableProperties = ["name"];
  const properties: ItemTableProperty[] = ["name", "element", "type", "characteristic", "power", "cost"].map((slug) => {
    const property: ItemTableProperty = {
      slug: slug,
      label: t(`properties.${slug}`),
      sortType: "string",
      className: slug === "element" ? "mx-auto" : "",
      isSearchable: searchableProperties.includes(slug),
    };
    if (slug === "power" || slug === "cost") {
      property.sortType = "number";
      property.className = "mx-auto";
    }
    return property;
  });

  return (
    <>
      <HissatsuActionBar className="mb-4" />
      <hr className="my-2 text-raimon-blue-dark" />
      <ItemTable<Hissatsu>
        {...props}
        items={hissatsuEntities}
        properties={properties}
        PropertyFormatter={HissatsuPropertyFormatter}
        FilterComponent={HissatsuFilters}
        defaultSortProperty="name"
        functions={{
          onItemClick: (hissatsu) => router.push(`/hissatsus/${hissatsu.id}`),
        }}
      />
    </>
  );
};

export default HissatsuTable;
