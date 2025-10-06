"use client";
import React, { useEffect, useState } from "react";
import ItemTableFilter, { type ItemTableFilterProperty } from "@components/ui/ItemTable/ItemTableFilter";
import { elements } from "@domain/shared/variables";
import { useTranslations } from "next-intl";
import type { IHissatsu } from "@hissatsu/hissatsu.types";
import { hissatsuCharacteristics, hissatsuTypes } from "@hissatsu/hissatsu.variables";

type HissatsuFiltersValue = {
  elements: string[];
  types: string[];
  characteristics: string[];
};

interface IProps {
  items: IHissatsu[];
  onFilterChange: (hissatsus: IHissatsu[]) => void;
}

const HissatsuFilters = ({ items: hissatsus, onFilterChange }: IProps) => {
  const [filters, setFilters] = useState<HissatsuFiltersValue>({
    elements: [],
    types: [],
    characteristics: [],
  });
  const t = useTranslations();
  const properties: ItemTableFilterProperty[] = [
    {
      slug: "elements",
      title: t("hissatsu.properties.element"),
      options: elements.map((el) => ({ value: el, label: t(`elements.${el}`) })),
      isMultiple: true,
    },
    {
      slug: "types",
      title: t("hissatsu.properties.type"),
      options: hissatsuTypes.map((type) => ({ value: type, label: t(`hissatsu.types.${type}`) })),
      isMultiple: true,
    },
    {
      slug: "characteristics",
      title: t("hissatsu.properties.characteristic"),
      options: hissatsuCharacteristics.map((char) => ({ value: char, label: t(`hissatsu.characteristics.${char}`) })),
      isMultiple: true,
    },
  ];

  useEffect(() => {
    const filteredHissatsus = hissatsus.filter((h) => {
      const matchesElement = filters.elements.length === 0 || filters.elements.includes(h.element);
      const matchesType = filters.types.length === 0 || filters.types.includes(h.type);
      const matchesCharacteristic =
        filters.characteristics.length === 0 ||
        (h.characteristic && filters.characteristics.includes(h.characteristic));
      return matchesElement && matchesType && matchesCharacteristic;
    });

    onFilterChange(filteredHissatsus);
  }, [filters]);

  return <ItemTableFilter id="hissatsu" properties={properties} filters={filters} onFilterChange={setFilters} />;
};

export default HissatsuFilters;
