"use client";
import CharacterForm from "@components/character/CharacterForm/CharacterForm";
import ImportEntities, {
  type IEntityBarComponentProps,
  type IFormComponentProps,
  type ImportSource,
} from "../common/ImportEntities";
import type { ICharacterData, ICharacterFormData } from "@character/character.types";
import type { IHissatsu } from "@hissatsu/hissatsu.types";
import { toast } from "sonner";
import { createCharactersAction } from "@/actions/character.actions";
import { useRouter } from "next/navigation";
import ErrorHelpers from "@utils/helpers/error.helpers";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useSettings } from "@context/SettingsContext";
import { findAllHissatsusAction } from "@/actions/hissatsu.actions";
import ElementIcon from "@components/ui/ElementIcon";

const ImportCharacters = ({ className, ...props }: React.HTMLAttributes<HTMLFormElement>) => {
  const t = useTranslations();
  const router = useRouter();
  const { settings } = useSettings();
  const [hissatsus, setHissatsus] = useState<IHissatsu[]>([]);
  const existingHissatsuNames = new Map<string, string>(hissatsus.map((h) => [h.name, h.id]));
  const existingHissatsuIds = new Set(hissatsus.map((h) => h.id));
  console.log({ existingHissatsuNames, existingHissatsuIds });

  useEffect(() => {
    findAllHissatsusAction({ locale: settings.hissatsuLocale }).then(setHissatsus);
  }, []);

  const handleDataValidated = (source: ImportSource, data: any[]) => {
    let characters: Partial<ICharacterData>[] = [];
    switch (source) {
      case "mongo":
        characters = data.map((json) => {
          return {
            firstName: json.firstName,
            lastName: json.lastName,
            names: {
              west: {
                firstName: json.names?.west?.firstName || json.firstName,
                lastName: json.names?.west?.lastName || json.lastName,
              },
              vo: {
                firstName: json.names?.vo?.firstName || json.firstName,
                lastName: json.names?.vo?.lastName || json.lastName,
              },
            },
            defaultPosition: json.defaultPosition,
            element: json.element,
            imageUrl: json.imageUrl,
            statistics: json.statistics,
            learnedHissatsus:
              json.learnedHissatsus?.map((hissatsu: any) => {
                let create = true;
                let id = hissatsu.id;
                if (id && existingHissatsuIds.has(hissatsu.id)) {
                  create = false;
                } else if (hissatsu.names?.jp && existingHissatsuNames.has(hissatsu.names.jp)) {
                  id = existingHissatsuNames.get(hissatsu.names.jp);
                  create = false;
                }

                return {
                  ...hissatsu,
                  id,
                  names: hissatsu.names || { fr: hissatsu.name, en: hissatsu.name, jp: hissatsu.name },
                  create,
                };
              }) || [],
          };
        });
        break;
      default:
        break;
    }
    return characters;
  };

  const handleSubmitData = async (data: ICharacterData[]) => {
    toast.promise(createCharactersAction(data), {
      success: () => {
        router.push("/characters");
        return t(`components.character.importCharacters.toasts.success`);
      },
      error: (e) => {
        const error = ErrorHelpers.parse(e);
        const explanation = error.messageKey || `components.character.importCharacters.toasts.error`;
        return t(explanation);
      },
      loading: t(`components.character.importCharacters.toasts.loading`),
    });
  };

  return (
    <ImportEntities
      {...props}
      onDataValidated={handleDataValidated}
      getId={(item, index) => `import-character-${item.firstName}-${item.lastName}-${index}`}
      onSubmitData={handleSubmitData}
      EntityBarComponent={CharacterBarName}
      FormComponent={(props) => <CharacterFormComponent {...props} hissatsus={hissatsus} />}
      entityName="characters"
      translationKeys={{
        dataLabel: "components.character.importCharacters.data.label",
        dataDescription: "components.character.importCharacters.data.description",
      }}
    />
  );
};

const CharacterBarName = (props: IEntityBarComponentProps<ICharacterFormData>) => {
  const t = useTranslations();
  const fullName = `${props.item.firstName || ""} ${props.item.lastName || ""}`.trim();

  return (
    <div className="flex items-center gap-2">
      <span className="font-semibold">{fullName || t("common.entities.character")} -</span>
      {props.item.defaultPosition && <span>{t(`character.positions.${props.item.defaultPosition}`)} -</span>}
      {props.item.element && <ElementIcon element={props.item.element} />}
    </div>
  );
};

const CharacterFormComponent = (props: IFormComponentProps<ICharacterFormData> & { hissatsus: IHissatsu[] }) => {
  return (
    <CharacterForm
      character={props.item}
      hissatsus={props.hissatsus}
      onFormChange={(data) => props.onDataChange(data as ICharacterFormData)}
      onFormSubmit={() => props.onValidate()}
    />
  );
};

export default ImportCharacters;
