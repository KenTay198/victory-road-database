"use client";
import { useMemo, useState } from "react";
import TextInput from "@components/ui/Inputs/TextInput";
import { useTranslations } from "use-intl";
import Button from "@components/ui/Buttons/Button";
import type { FormError, RecursivePartial } from "@utils/types";
import { toast } from "sonner";
import ErrorHelpers from "@utils/helpers/error.helpers";
import type {
  CharacterLocale,
  CharacterNames,
  ICharacterData,
  ICharacterFormData,
  IFullCharacter,
} from "@character/character.types";
import SelectInput from "@components/ui/Inputs/SelectInput";
import { characterElements, positions, statKeys } from "@character/character.variables";
import CharacterImage from "../CharacterImage";
import NumberInput from "@components/ui/Inputs/NumberInput";
import Statistics from "@character/entities/statistics.entity";
import { createCharacterAction, updateCharacterAction } from "@/actions/character.actions";
import { useRouter } from "next/navigation";
import type { IHissatsu, ICreateLearnedHissatsu } from "@hissatsu/hissatsu.types";
import CharacterFormHissatsu from "./CharacterFormHissatsu";

interface IProps extends React.HTMLAttributes<HTMLFormElement> {
  character?: IFullCharacter;
  hissatsus: IHissatsu[];
}

const CharacterForm = ({ className, character, hissatsus, ...props }: IProps) => {
  const t = useTranslations();
  const isEdit = !!character;
  const form = isEdit ? "updateCharacterForm" : "newCharacterForm";
  const router = useRouter();
  const [data, setData] = useState<Partial<ICharacterFormData>>({
    firstName: character?.firstName || "",
    lastName: character?.lastName || "",
    imageUrl: character?.imageUrl || "",
    element: character?.element,
    defaultPosition: character?.defaultPosition,
    names: character?.names || {},
    statistics: character?.statistics || {},
    learnedHissatsus: character?.learnedHissatsus || [],
  });
  const [imageLoaded, setImageLoaded] = useState(false);
  const [errors, setErrors] = useState<FormError[]>([]);
  const total = useMemo(() => {
    const stat = new Statistics({
      kick: data.statistics?.kick,
      control: data.statistics?.control,
      pressure: data.statistics?.pressure,
      physical: data.statistics?.physical,
      agility: data.statistics?.agility,
      intelligence: data.statistics?.intelligence,
      technique: data.statistics?.technique,
    });
    return stat.getTotalStats();
  }, [data.statistics]);

  const handleChange = (field: string, value: any) => {
    setData((prev) => {
      let newData: Partial<ICharacterFormData> = { ...prev };
      if (field.includes("west_") || field.includes("vo_")) {
        const split = field.split("_");
        const lang = split[0] as CharacterLocale;
        const fieldName = split[1] as keyof CharacterNames;
        const names: Partial<CharacterNames> = {
          ...(prev.names || {}),
          [lang]: {
            ...(prev.names?.[lang] || {}),
            [fieldName]: value,
          },
        };

        newData.names = names;
        if (field.includes("west_")) {
          newData = { ...newData, [fieldName]: value };
          const imageUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/images/characters/${(newData.firstName || "").toLowerCase()}${newData.lastName ? `_${newData.lastName.toLowerCase()}` : ""}.jpg`;
          newData = { ...newData, imageUrl };
        }
      } else if (field.includes("statistics.")) {
        const statistics: RecursivePartial<ICharacterData["statistics"]> = {
          ...(prev.statistics || {}),
          [field.split(".")[1]]: value,
        };
        newData.statistics = statistics;
      } else {
        (newData as any)[field] = value;
      }

      return newData;
    });
  };

  const checkErrors = (data: Partial<ICharacterFormData>): data is ICharacterFormData => {
    const errors: FormError[] = [];
    const { names, imageUrl, statistics, element, defaultPosition, learnedHissatsus } = data;
    if (!names?.vo?.firstName) {
      errors.push({ field: "vo_firstName", message: t("errors.common.required") });
    }
    if (!names?.west?.firstName) {
      errors.push({ field: "west_firstName", message: t("errors.common.required") });
    }
    if (!element) {
      errors.push({ field: "element", message: t("errors.common.required") });
    }
    if (!defaultPosition) {
      errors.push({ field: "defaultPosition", message: t("errors.common.required") });
    }
    if (imageUrl && !imageLoaded) {
      errors.push({ field: "imageUrl", message: t("components.character.newCharacterForm.errors.invalidImage") });
    }
    if (!statistics) {
      errors.push(
        { field: "statistics", message: t("errors.common.required") },
        ...statKeys
          .filter((key) => key !== "total")
          .map((stat) => ({ field: `statistics.${stat}`, message: t("errors.common.required") })),
      );
    } else {
      for (const stat of statKeys) {
        if (stat === "total") continue;
        if (typeof statistics[stat] !== "number") {
          errors.push({ field: `statistics.${stat}`, message: t("errors.common.required") });
        }
      }
    }
    if (learnedHissatsus?.length) {
      for (let i = 0; i < learnedHissatsus.length; i++) {
        const hissatsu = learnedHissatsus[i];
        if (!hissatsu.learnLevel) {
          errors.push({ field: `learnedHissatsus.${i}.learnLevel`, message: t("errors.common.required") });
        }

        if (hissatsu.create) {
          const { cost, element, name, names, power, type } = hissatsu;
          if (!name) {
            errors.push({ field: `learnedHissatsus.${i}.name`, message: t("errors.common.required") });
          }
          if (!element) {
            errors.push({ field: `learnedHissatsus.${i}.element`, message: t("errors.common.required") });
          }
          if (!type) {
            errors.push({ field: `learnedHissatsus.${i}.type`, message: t("errors.common.required") });
          }
          if (typeof power !== "number") {
            errors.push({ field: `learnedHissatsus.${i}.power`, message: t("errors.common.required") });
          }
          if (typeof cost !== "number") {
            errors.push({ field: `learnedHissatsus.${i}.cost`, message: t("errors.common.required") });
          }
          if (!names?.fr) {
            errors.push({ field: `learnedHissatsus.${i}.names.fr`, message: t("errors.common.required") });
          }
          if (!names?.en) {
            errors.push({ field: `learnedHissatsus.${i}.names.en`, message: t("errors.common.required") });
          }
          if (!names?.jp) {
            errors.push({ field: `learnedHissatsus.${i}.names.jp`, message: t("errors.common.required") });
          }
        } else {
          if (!hissatsu.id) {
            errors.push({ field: `learnedHissatsus.${i}.id`, message: t("errors.common.required") });
          }
        }
      }
    }

    setErrors(errors);
    return errors.length === 0;
  };

  const handleSubmit = () => {
    if (checkErrors(data)) {
      let promise: Promise<any>;
      if (isEdit) {
        promise = updateCharacterAction(character.id, data);
      } else {
        promise = createCharacterAction(data);
      }
      toast.promise(promise, {
        success: (result) => {
          router.push(`/characters/${isEdit ? `${character.id}` : `${result}`}`);
          return t(`components.character.${form}.toasts.success`);
        },
        error: (e) => {
          const error = ErrorHelpers.parse(e);
          const explanation = error.messageKey || `components.character.${form}.toasts.error`;
          if (error.hasFields()) {
            console.log(error.data.fields);

            setErrors(error.data.fields.map(({ field, message }) => ({ field, message: t(message) })));
          }
          return t(explanation);
        },
        loading: t(`components.character.${form}.toasts.loading`),
      });
    }
  };

  return (
    <form {...props} className={["space-y-4", className].join(" ")}>
      <h2>{t("components.character.newCharacterForm.sections.general")}</h2>
      <div className="flex flex-wrap gap-10">
        <div className="flex-1 space-y-1">
          <h3>{t("components.character.newCharacterForm.sections.dubName")}</h3>
          <TextInput
            id="west_firstName"
            label={t("character.properties.firstName")}
            value={data.names?.west?.firstName || ""}
            handleChange={(value) => handleChange("west_firstName", value)}
            error={errors.find((e) => e.field === "west_firstName")?.message}
            required
          />
          <TextInput
            id="west_lastName"
            label={t("character.properties.lastName")}
            value={data.names?.west?.lastName || ""}
            handleChange={(value) => handleChange("west_lastName", value)}
            error={errors.find((e) => e.field === "west_lastName")?.message}
          />
        </div>
        <div className="flex-1 space-y-1">
          <h3>{t("components.character.newCharacterForm.sections.voName")}</h3>
          <TextInput
            id="vo_firstName"
            label={t("character.properties.firstName")}
            value={data.names?.vo?.firstName || ""}
            handleChange={(value) => handleChange("vo_firstName", value)}
            error={errors.find((e) => e.field === "vo_firstName")?.message}
            required
          />
          <TextInput
            id="vo_lastName"
            label={t("character.properties.lastName")}
            value={data.names?.vo?.lastName || ""}
            handleChange={(value) => handleChange("vo_lastName", value)}
            error={errors.find((e) => e.field === "vo_lastName")?.message}
          />
        </div>
        {data.imageUrl?.startsWith("http") && (
          <div>
            <CharacterImage
              key="imageUrl"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageLoaded(false)}
              size="M"
              fullName={"Image introuvable"}
              imageUrl={data.imageUrl}
              preferredWidth={170}
            />
          </div>
        )}
      </div>
      <TextInput
        id="imageUrl"
        label={t("character.properties.imageUrl")}
        value={data.imageUrl || ""}
        handleChange={(value) => handleChange("imageUrl", value)}
        error={errors.find((e) => e.field === "imageUrl")?.message}
      />
      <SelectInput
        id="element"
        label={t("character.properties.element")}
        value={data.element || ""}
        options={characterElements.map((pos) => ({ value: pos, label: t(`elements.${pos}`) }))}
        handleChange={(value) => handleChange("element", value)}
        error={errors.find((e) => e.field === "element")?.message}
        required
      />
      <SelectInput
        id="defaultPosition"
        label={t("character.properties.defaultPosition")}
        description={t("components.character.newCharacterForm.fields.defaultPosition.description")}
        value={data.defaultPosition || ""}
        options={positions.map((pos) => ({ value: pos, label: t(`character.positions.${pos}`) }))}
        handleChange={(value) => handleChange("defaultPosition", value)}
        error={errors.find((e) => e.field === "defaultPosition")?.message}
        required
      />

      <h2>{t("character.properties.statistics")}</h2>
      {errors.find((e) => e.field === "statistics")?.message && (
        <p className="text-xs text-red-600 mt-1" role="alert">
          {errors.find((e) => e.field === "statistics")?.message}
        </p>
      )}
      <div className="grid grid-cols-2 gap-2">
        {statKeys
          .filter((key) => key !== "total")
          .map((stat) => (
            <div key={stat}>
              <NumberInput
                id={stat}
                label={t(`character.statistics.${stat}`)}
                value={data.statistics?.[stat] || ""}
                handleChange={(value) => handleChange(`statistics.${stat}`, value)}
                error={errors.find((e) => e.field === `statistics.${stat}`)?.message}
                step={1}
                min={0}
                max={999}
              />
            </div>
          ))}
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">{t("character.statistics.total")}</p>
          <p className="">{total}</p>
        </div>
      </div>

      <h2>{t("character.properties.hissatsus")}</h2>
      {(!data.learnedHissatsus || data.learnedHissatsus.length < 2) && (
        <Button
          template="blue"
          size="S"
          onClick={() => handleChange("learnedHissatsus", [...(data.learnedHissatsus || []), {}])}
        >
          {t("common.buttons.add")}
        </Button>
      )}
      {data.learnedHissatsus?.map((hissatsu, i) => {
        const key = `hissatsu_${i}`;
        return (
          <div key={key} className="flex items-end">
            <CharacterFormHissatsu
              id={key}
              index={i}
              errors={errors}
              learnedHissatsu={hissatsu}
              hissatsus={hissatsus}
              onChangeHissatsu={(value) => {
                const learnedHissatsus: (Partial<ICreateLearnedHissatsu> | undefined)[] = data.learnedHissatsus
                  ? [...data.learnedHissatsus]
                  : [];
                learnedHissatsus[i] = value;
                handleChange("learnedHissatsus", learnedHissatsus);
              }}
              onDelete={() =>
                handleChange(
                  "learnedHissatsus",
                  data.learnedHissatsus?.filter((_, idx) => idx !== i),
                )
              }
            />
          </div>
        );
      })}
      <Button className="mx-auto flex" template="blue" onClick={handleSubmit}>
        {t("common.buttons.submit")}
      </Button>
    </form>
  );
};

export default CharacterForm;
