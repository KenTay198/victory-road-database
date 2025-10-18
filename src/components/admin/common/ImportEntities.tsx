"use client";
import { useState } from "react";
import SelectInput from "@components/ui/Inputs/SelectInput";
import TextareaInput from "@components/ui/Inputs/TextareaInput";
import Button from "@components/ui/Buttons/Button";
import type { FormError } from "@utils/types";
import { useTranslations } from "next-intl";
import type { ICharacterData } from "@character/character.types";
import ImportEntitiesResults from "./ImportEntitiesResults";

export type ImportSource = "mongo";

export interface IEntityBarComponentProps<T> {
  item: T;
}

export interface IFormComponentProps<T> {
  item: T;
  onDataChange: (data: T) => void;
  onValidate: () => void;
}

export interface IImportEntitiesResultsProps<T> {
  onSubmitData: (data: any[]) => Promise<void>;
  getId: (item: T, index: number) => string;
  EntityBarComponent: (props: IEntityBarComponentProps<T>) => React.ReactNode;
  FormComponent: (props: IFormComponentProps<T>) => React.ReactNode;
  entityName?: string; // "characters", "hissatsus", etc.
  translationKeys?: {
    dataLabel: string;
    dataDescription: string;
  };
}

interface IProps<T> extends React.HTMLAttributes<HTMLFormElement>, IImportEntitiesResultsProps<T> {
  onDataValidated: (source: ImportSource, data: any[]) => any[];
}

function ImportEntities<T = any>({
  className,
  onDataValidated,
  onSubmitData,
  getId,
  EntityBarComponent,
  FormComponent,
  entityName = "items",
  translationKeys = {
    dataLabel: "components.character.importCharacters.data.label",
    dataDescription: "components.character.importCharacters.data.description",
  },
  ...props
}: IProps<T>) {
  const t = useTranslations();
  const [source, setSource] = useState<ImportSource>();
  const [data, setData] = useState<string>("");
  const [errors, setErrors] = useState<FormError[]>([]);
  const [results, setResults] = useState<Partial<ICharacterData>[]>([]);
  const [loaded, setLoaded] = useState(false);

  const checkErrors = (source?: ImportSource): source is ImportSource => {
    const errors: FormError[] = [];
    if (!source) {
      errors.push({ field: "source", message: t("common.errors.required") });
    }
    if (!data) {
      errors.push({ field: "data", message: t("common.errors.required") });
    } else {
      try {
        JSON.parse(data);
      } catch {
        errors.push({ field: "data", message: t("common.errors.invalidJson") });
      }
    }
    setErrors(errors);
    return errors.length === 0;
  };

  const handleSubmit = () => {
    if (checkErrors(source)) {
      let json: any[] = JSON.parse(data);
      if (!Array.isArray(json)) {
        json = [json];
      }
      const results = onDataValidated(source, json);

      setResults(results);
      setLoaded(true);
    }
  };

  if (loaded) {
    return (
      <ImportEntitiesResults
        items={results}
        onSubmitData={onSubmitData}
        getId={getId}
        EntityBarComponent={EntityBarComponent}
        FormComponent={FormComponent}
        entityName={entityName}
      />
    );
  }

  return (
    <form {...props} className={["space-y-4", className].join(" ")}>
      <SelectInput
        id="source"
        value={source || ""}
        label="Source"
        options={[{ label: "MongoDB", value: "mongo" }]}
        handleChange={(value) => setSource(value as ImportSource)}
        error={errors.find((e) => e.field === "source")?.message}
      />
      <TextareaInput
        id="data"
        label={t(translationKeys.dataLabel)}
        description={t(translationKeys.dataDescription)}
        value={data}
        handleChange={setData}
        className="h-[500px] resize-none"
        error={errors.find((e) => e.field === "data")?.message}
      />
      <Button template="blue" onClick={handleSubmit}>
        {t("common.buttons.submit")}
      </Button>
    </form>
  );
}

export default ImportEntities;
