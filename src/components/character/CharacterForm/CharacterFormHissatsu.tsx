"use client";
import { useEffect, useState } from "react";
import type { ICreateLearnedHissatsu } from "@hissatsu/hissatsu.types";
import Button from "@components/ui/Buttons/Button";
import NumberInput from "@components/ui/Inputs/NumberInput";
import SelectInput from "@components/ui/Inputs/SelectInput";
import { useTranslations } from "next-intl";
import type { IHissatsu } from "@hissatsu/hissatsu.types";
import { elements } from "@domain/shared/variables";
import TextInput from "@components/ui/Inputs/TextInput";
import { hissatsuTypes } from "@hissatsu/hissatsu.variables";
import type { FormError } from "@utils/types";
import IconButton from "@components/ui/Buttons/IconButton";
import { FaTrash } from "react-icons/fa";
import { useSettings } from "@context/SettingsContext";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  index: number;
  learnedHissatsu?: Partial<ICreateLearnedHissatsu>;
  hissatsus: IHissatsu[];
  onChangeHissatsu: (value: Partial<ICreateLearnedHissatsu> | undefined) => void;
  onDelete: () => void;
  errors: FormError[];
}

const CharacterFormHissatsu = ({
  className,
  learnedHissatsu,
  hissatsus,
  index,
  errors,
  onChangeHissatsu,
  onDelete,
  ...props
}: IProps) => {
  const t = useTranslations();
  const { settings } = useSettings();
  const [isCreating, setIsCreating] = useState(false);

  const handleChange = (field: keyof ICreateLearnedHissatsu, value: any) => {
    const newLearnedHissatsu = { ...learnedHissatsu, [field]: value };
    if (field === "names" && value.jp) {
      newLearnedHissatsu.name = value.jp;
    }
    onChangeHissatsu(newLearnedHissatsu);
  };

  useEffect(() => {
    onChangeHissatsu({ learnLevel: learnedHissatsu?.learnLevel, create: isCreating });
  }, [isCreating]);

  return (
    <div className="flex-1 space-y-2">
      <div className="flex items-center gap-4">
        <h3>{t(`character.properties.hissatsuNb`, { count: index + 1 })}</h3>
        <Button template="blue" size="S" active={isCreating} onClick={() => setIsCreating((prev) => !prev)}>
          {t("components.character.newCharacterForm.actions.newHissatsu")}
        </Button>
        <IconButton size="S" title={t("common.buttons.delete")} Icon={FaTrash} template="fire" onClick={onDelete} />
      </div>
      <NumberInput
        id={`${props.id}-learnLevel`}
        label={t(`hissatsu.properties.learnLevel`)}
        value={learnedHissatsu?.learnLevel || ""}
        handleChange={(value) => handleChange("learnLevel", value)}
        error={errors.find((e) => e.field === `learnedHissatsus.${index}.learnLevel`)?.message}
        divClassName="max-w-[150px]"
        step={1}
        min={1}
        max={99}
      />
      {isCreating ? (
        <>
          <div className="flex flex-wrap gap-2">
            <TextInput
              id={`${props.id}-names-fr`}
              label={`${t(`hissatsu.properties.name`)} (${t("common.locales.fr")})`}
              value={learnedHissatsu?.names?.fr || ""}
              handleChange={(value) => handleChange("names", { ...learnedHissatsu?.names, fr: value })}
              error={errors.find((e) => e.field === `learnedHissatsus.${index}.names.fr`)?.message}
              divClassName="flex-1"
            />
            <TextInput
              id={`${props.id}-names-en`}
              label={`${t(`hissatsu.properties.name`)} (${t("common.locales.en")})`}
              value={learnedHissatsu?.names?.en || ""}
              handleChange={(value) => handleChange("names", { ...learnedHissatsu?.names, en: value })}
              error={errors.find((e) => e.field === `learnedHissatsus.${index}.names.en`)?.message}
              divClassName="flex-1"
            />
            <TextInput
              id={`${props.id}-names-jp`}
              label={`${t(`hissatsu.properties.name`)} (${t("common.locales.jp")})`}
              value={learnedHissatsu?.names?.jp || ""}
              handleChange={(value) => handleChange("names", { ...learnedHissatsu?.names, jp: value })}
              error={errors.find((e) => e.field === `learnedHissatsus.${index}.names.jp`)?.message}
              divClassName="flex-1"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <SelectInput
              id={`${props.id}-element`}
              label={t(`hissatsu.properties.element`)}
              value={learnedHissatsu?.element || ""}
              options={elements.map((elem) => ({ value: elem, label: t(`elements.${elem}`) }))}
              handleChange={(value) => handleChange("element", value)}
              error={errors.find((e) => e.field === `learnedHissatsus.${index}.element`)?.message}
              divClassName="flex-1"
            />
            <SelectInput
              id={`${props.id}-type`}
              label={t(`hissatsu.properties.type`)}
              value={learnedHissatsu?.type || ""}
              options={hissatsuTypes.map((type) => ({
                value: type,
                label: t(`hissatsu.types.${type}`),
              }))}
              handleChange={(value) => handleChange("type", value)}
              error={errors.find((e) => e.field === `learnedHissatsus.${index}.type`)?.message}
              divClassName="flex-1"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <NumberInput
              id={`${props.id}-power`}
              label={t(`hissatsu.properties.power`)}
              value={learnedHissatsu?.power || ""}
              handleChange={(value) => handleChange("power", value)}
              error={errors.find((e) => e.field === `learnedHissatsus.${index}.power`)?.message}
              divClassName="flex-1"
              step={1}
              min={1}
              max={99}
            />
            <NumberInput
              id={`${props.id}-cost`}
              label={t(`hissatsu.properties.cost`)}
              value={learnedHissatsu?.cost || ""}
              handleChange={(value) => handleChange("cost", value)}
              error={errors.find((e) => e.field === `learnedHissatsus.${index}.cost`)?.message}
              divClassName="flex-1"
              step={1}
              min={1}
              max={99}
            />
          </div>
        </>
      ) : (
        <SelectInput
          id={`${props.id}-id`}
          label={t(`hissatsu.properties.name`)}
          value={learnedHissatsu?.id || ""}
          options={hissatsus.map((hissatsu) => ({
            value: hissatsu.id,
            label: hissatsu.names[settings.hissatsuLocale],
          }))}
          handleChange={(value) => handleChange("id", value)}
          error={errors.find((e) => e.field === `learnedHissatsus.${index}.id`)?.message}
          divClassName="flex-1"
        />
      )}
    </div>
  );
};

export default CharacterFormHissatsu;
