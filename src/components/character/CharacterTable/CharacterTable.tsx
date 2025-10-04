"use client";
import Character from "@character/entities/character.entity";
import type { ICharacter } from "@character/character.types";
import { advancedStatKeys, statKeys } from "@character/character.variables";
import ItemTable, { type ItemTableProperty } from "@components/ui/ItemTable/ItemTable";
import { useModalDialog } from "@/hooks/useModalDialog";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CharacterPropertyFormatter from "@components/character/CharacterPropertyFormatter";
import type { CharacterTableMode } from "./CharacterTableModeSwitcher";
import CharactersCompare from "@components/character/CharactersCompare";
import { toast } from "sonner";
import CharacterActionBar, { type CharacterTableOptions } from "./CharacterActionBar";
import CharacterGrid from "./CharacterGrid";
import { useSettings } from "@context/SettingsContext";

interface IProps extends React.HTMLAttributes<HTMLTableElement> {
  characters: ICharacter[];
}

const CharacterTable = ({ className, characters, ...props }: IProps) => {
  const { settings } = useSettings();
  const [options, setOptions] = useState<CharacterTableOptions>({
    display: "table",
    mode: "general",
  });
  const [properties, setProperties] = useState<ItemTableProperty[]>([]);
  const [selectedCharacters, setSelectedCharacters] = useState<Character[]>([]);
  const router = useRouter();
  const t = useTranslations("character");
  const characterEntities = characters.map((c) => {
    const character = Character.fromJSON(c);
    character.setLocalizedName(settings.characterLocale);
    return character;
  });

  const compareModal = useModalDialog({
    title: t("comparison.title"),
    content: <CharactersCompare characters={selectedCharacters} />,
    options: {
      width: 1000,
      maxHeight: "80vh",
    },
  });

  useEffect(() => {
    const keys: ItemTableProperty[] = ["fullName", "element", "defaultPosition", "archetypes"].map((slug) => ({
      slug: slug,
      label: t(`properties.${slug}`),
      sortType: "string",
    }));

    switch (options.mode) {
      case "general": {
        const statisticKeys: ItemTableProperty[] = statKeys.map((slug) => ({
          slug: `statistics.${slug}`,
          label: t(`statistics.${slug}`),
          sortType: "number",
          withCalculations: true,
        }));
        setProperties([...keys, ...statisticKeys]);
        break;
      }
      case "advanced": {
        const advancedStatisticKeys: ItemTableProperty[] = advancedStatKeys.map((slug) => ({
          slug: `advancedStatistics.${slug}`,
          label: t(`advancedStatistics.${slug}`),
          sortType: "number",
          withCalculations: true,
        }));
        setProperties([...keys, ...advancedStatisticKeys]);
        break;
      }
      default:
        break;
    }
  }, [options.mode, t]);

  return (
    <>
      <CharacterActionBar options={options} onChangeOptions={setOptions} className="mb-4" />
      <hr className="my-2 text-raimon-blue-dark" />
      {options.display === "table" && (
        <ItemTable<Character>
          {...props}
          items={characterEntities}
          properties={properties}
          PropertyFormatter={CharacterPropertyFormatter}
          defaultSortProperty="fullName"
          functions={{
            onItemClick: (character) => router.push(`/characters/${character.id}`),
            onSelectedUpdate: (items) => setSelectedCharacters(items),
            onCompare: () => {
              if (selectedCharacters.length < 2) toast.error(t("comparison.errors.min"));
              else if (selectedCharacters.length > 5) toast.error(t("comparison.errors.max"));
              else compareModal.open();
            },
          }}
        />
      )}

      {options.display === "grid" && <CharacterGrid characters={characterEntities} />}
    </>
  );
};

export default CharacterTable;
