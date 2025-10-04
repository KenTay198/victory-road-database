import type Character from "@character/entities/character.entity";
import type React from "react";
import CharacterImage from "./CharacterImage";
import CharacterPropertyFormatter from "./CharacterPropertyFormatter";
import CharacterStatisticsTable from "./CharacterStatisticsTable";
import CharacterHissatsusTable from "./CharacterHissatsusTable";
import { useTranslations } from "next-intl";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  character: Character;
}

const CharacterView = ({ className, character, ...props }: IProps) => {
  const t = useTranslations();
  const pageT = useTranslations("pages.characters.pages.character");
  const generalProperties: (keyof Character)[] = ["firstName", "lastName", "element", "defaultPosition", "archetypes"];

  const getDisplayedValue = (key: keyof Character) => {
    const value = character[key];
    if (key === "element") {
      return t(`elements.${value}`);
    }
    return value;
  };

  return (
    <div {...props} className={["space-y-4", className].join(" ")}>
      <section>
        <h2>{pageT("sections.general")}</h2>
        <div className="flex flex-wrap gap-8">
          <CharacterImage character={character} size="large" className="rounded-lg" />
          <div className="space-y-2">
            {generalProperties.map((key) => (
              <div key={key} className="flex items-center gap-2">
                <strong>{t(`character.properties.${key}`)}:</strong>
                <span>
                  <CharacterPropertyFormatter
                    property={key}
                    value={getDisplayedValue(key)}
                    asValue={key === "element"}
                  />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="flex flex-wrap gap-12">
        <div>
          <h2>{pageT("sections.statistics")}</h2>
          <CharacterStatisticsTable
            template={character.element}
            statistics={character.statistics}
            advancedStatistics={character.advancedStatistics}
          />
        </div>
        <div>
          <h2>{pageT("sections.hissatsus")}</h2>
          <CharacterHissatsusTable
            template={character.element}
            learnedHissatsus={character.learnedHissatsus}
            hissatsus={character.hissatsus}
          />
        </div>
      </section>
    </div>
  );
};

export default CharacterView;
