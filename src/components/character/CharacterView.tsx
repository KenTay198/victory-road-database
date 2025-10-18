import type React from "react";
import type Character from "@character/entities/character.entity";
import CharacterImage from "./CharacterImage";
import CharacterPropertyFormatter from "./CharacterPropertyFormatter";
import CharacterStatisticsTable from "./CharacterStatisticsTable";
import CharacterHissatsusTable from "./CharacterHissatsusTable";
import { useTranslations } from "next-intl";
import CharacterTendencies from "./CharacterTendencies";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  character: Character;
}

const CharacterView = ({ className, character, ...props }: IProps) => {
  const t = useTranslations();
  const pageT = useTranslations("pages.characters.character");
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
          <div>
            <CharacterImage
              imageUrl={character.imageUrl}
              fullName={character.fullName}
              size="L"
              className="rounded-lg"
            />
          </div>
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
          <CharacterTendencies character={character.toJSON()} meta={character.getMeta()?.toJSON()} />
        </div>
      </section>

      <section className="flex flex-wrap gap-12">
        <div className="max-w-full">
          <h2>{pageT("sections.statistics")}</h2>
          <div className="overflow-auto">
            <CharacterStatisticsTable
              template={character.element}
              statistics={character.statistics}
              advancedStatistics={character.advancedStatistics}
            />
          </div>
        </div>
        <div className="max-w-full">
          <h2>{pageT("sections.hissatsus")}</h2>
          <div className="overflow-auto">
            <CharacterHissatsusTable
              template={character.element}
              learnedHissatsus={character.learnedHissatsus}
              hissatsus={character.hissatsus}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default CharacterView;
