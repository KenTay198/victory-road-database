"use client";
import type { ICharacterData, ICharacterFormData } from "@character/character.types";
import CharacterForm from "@components/character/CharacterForm/CharacterForm";
import ElementIcon from "@components/ui/ElementIcon";
import type { IHissatsu } from "@hissatsu/hissatsu.types";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { findAllHissatsusAction } from "@/actions/hissatsu.actions";
import { useSettings } from "@context/SettingsContext";
import { FaCheckCircle, FaTimesCircle, FaTrash } from "react-icons/fa";
import Button from "@components/ui/Buttons/Button";
import { toast } from "sonner";
import { createCharactersAction } from "@/actions/character.actions";
import { useRouter } from "next/navigation";
import ErrorHelpers from "@utils/helpers/error.helpers";

interface IProps {
  characters: Partial<ICharacterData>[];
}

type Status = "deleted" | "validated";

type CharacterDataWithStatus = Partial<ICharacterFormData> & { status?: Status };

const ImportCharactersResults = (props: IProps) => {
  const t = useTranslations();
  const router = useRouter();
  const [characters, setCharacters] = useState<CharacterDataWithStatus[]>(props.characters);
  const { settings } = useSettings();
  const [hissatsus, setHissatsus] = useState<IHissatsu[]>([]);

  useEffect(() => {
    findAllHissatsusAction({ locale: settings.hissatsuLocale }).then(setHissatsus);
  }, [settings]);

  const handleChangeStatus = (index: number, status: Status) => {
    setCharacters((prev) => prev.map((char, i) => (i === index ? { ...char, status } : char)));
  };

  const handleDataChange = (index: number, data: Partial<ICharacterFormData>) => {
    setCharacters((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], ...data };
      return updated;
    });
  };

  const checkValidated = (characters: CharacterDataWithStatus[]): characters is ICharacterFormData[] => {
    return characters.length > 0;
  };

  const handleSubmit = () => {
    const sendCharacters = [...characters]
      .filter((char) => char.status === "validated")
      .map(({ status, ...char }) => char);
    if (checkValidated(sendCharacters)) {
      toast.promise(createCharactersAction(sendCharacters), {
        success: () => {
          router.push("/characters");
          return t(`components.character.toasts.success`);
        },
        error: (e) => {
          const error = ErrorHelpers.parse(e);
          const explanation = error.messageKey || `components.character.toasts.error`;
          // if (error.hasFields()) {
          //   setErrors(error.data.fields.map(({ field, message }) => ({ field, message: t(message) })));
          // }
          return t(explanation);
        },
        loading: t(`components.character.toasts.loading`),
      });
    } else {
      toast.error("Missing validations");
    }
  };

  return (
    <div>
      <h2>Import Results</h2>
      <p>Retrieved {characters.length} characters.</p>
      <p>Click on a character to edit their details. Every character should be validated to submit the form.</p>
      <div className="space-y-4">
        {props.characters.map((character, index) => {
          const id = `imported-character-${character.firstName}-${character.lastName}-${index}`;
          const characterData = characters[index];
          if (characterData?.status === "deleted") return null;
          return (
            <ExpandableResult
              character={character}
              hissatsus={hissatsus}
              onDelete={() => handleChangeStatus(index, "deleted")}
              onValidate={() => handleChangeStatus(index, "validated")}
              onDataChange={(data) => handleDataChange(index, data)}
              validated={characterData?.status === "validated"}
              key={id}
            />
          );
        })}
      </div>
      <Button onClick={handleSubmit} disabled={characters.every((char) => char.status !== "validated")} template="blue">
        {t("common.buttons.submit")}
      </Button>
    </div>
  );
};

interface IExpandableResultProps {
  character: Partial<ICharacterFormData>;
  hissatsus: IHissatsu[];
  validated: boolean;
  onDelete: () => void;
  onDataChange: (character: Partial<ICharacterFormData>) => void;
  onValidate: () => void;
}

const ExpandableResult = ({
  character,
  hissatsus,
  onDelete,
  onDataChange,
  onValidate,
  validated,
}: IExpandableResultProps) => {
  const t = useTranslations();
  const [expanded, setExpanded] = useState(false);

  const ValidIcon = validated ? FaCheckCircle : FaTimesCircle;
  const ToggleIcon = expanded ? IoChevronUp : IoChevronDown;
  const handleValidate = () => {
    setExpanded(false);
    onValidate();
  };

  return (
    <div className="space-y-2">
      <button
        className="bg-raimon-blue/50 p-2 rounded flex items-center justify-between cursor-pointer w-full"
        onClick={() => setExpanded(!expanded)}
        onKeyUp={() => setExpanded(!expanded)}
        type="button"
      >
        <div className="flex items-center gap-2">
          <span className="font-semibold">
            {character.firstName}
            {character.lastName ? ` ${character.lastName}` : ""} -
          </span>
          <span>{t(`character.positions.${character.defaultPosition}`)} -</span>
          {character.element && <ElementIcon element={character.element} />}
          <ValidIcon size={20} className={validated ? "text-green-500" : "text-gray-500"} />
        </div>
        <div className="flex items-center gap-1">
          <ToggleIcon size={20} />
          <FaTrash
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          />
        </div>
      </button>

      <div className={`bg-raimon-blue/20 p-2 rounded ${expanded ? "block" : "hidden"}`}>
        <CharacterForm
          character={character}
          hissatsus={hissatsus}
          onFormChange={onDataChange}
          onFormSubmit={handleValidate}
          submitLabel="Validate"
        />
      </div>
    </div>
  );
};
export default ImportCharactersResults;
