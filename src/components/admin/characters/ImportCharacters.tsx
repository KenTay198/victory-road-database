"use client";
import { useState } from "react";
import SelectInput from "@components/ui/Inputs/SelectInput";
import TextareaInput from "@components/ui/Inputs/TextareaInput";
import Button from "@components/ui/Buttons/Button";
import type { FormError } from "@utils/types";
import { useTranslations } from "next-intl";
import type { ICharacterData } from "@character/character.types";
import ImportCharactersResults from "./ImportCharactersResults";

type CharacterImportSource = "mongo";

const ImportCharacters = ({ className, ...props }: React.HTMLAttributes<HTMLFormElement>) => {
  const t = useTranslations();
  const [source, setSource] = useState<CharacterImportSource>();
  const [data, setData] = useState<string>("");
  const [errors, setErrors] = useState<FormError[]>([]);
  const [results, setResults] = useState<Partial<ICharacterData>[]>([]);
  const [loaded, setLoaded] = useState(false);

  const checkErrors = () => {
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
    if (checkErrors()) {
      let json: any[] = JSON.parse(data);
      if (!Array.isArray(json)) {
        json = [json];
      }
      let characters: Partial<ICharacterData>[] = [];
      switch (source) {
        case "mongo":
          characters = json.map((json) => {
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
              learnedHissatsus: json.learnedHissatsus.map((hissatsu: any) => {
                const hasHissatsuData = Object.entries(hissatsu).some(
                  ([key, value]) => !["id", "learnLevel"].includes(key) && !!value,
                );

                return {
                  ...hissatsu,
                  names: hissatsu.names || { fr: hissatsu.name, en: hissatsu.name, jp: hissatsu.name },
                  create: hasHissatsuData,
                };
              }),
            };
          });
          break;
        default:
          break;
      }

      setResults(characters);
      setLoaded(true);
    }
  };

  if (loaded) {
    return <ImportCharactersResults characters={results} />;
  }

  return (
    <form {...props} className={["space-y-4", className].join(" ")}>
      <SelectInput
        id="source"
        value={source || ""}
        label="Source"
        options={[{ label: "MongoDB", value: "mongo" }]}
        handleChange={(value) => setSource(value as CharacterImportSource)}
        error={errors.find((e) => e.field === "source")?.message}
      />
      <TextareaInput
        id="data"
        label="Data"
        description="Paste the data according to the source selected."
        value={data}
        handleChange={setData}
        className="h-[500px]"
        error={errors.find((e) => e.field === "data")?.message}
      />
      <Button template="blue" onClick={handleSubmit}>
        Submit
      </Button>
    </form>
  );
};

export default ImportCharacters;
