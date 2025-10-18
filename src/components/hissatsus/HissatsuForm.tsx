"use client";
import { useState } from "react";
import TextInput from "@components/ui/Inputs/TextInput";
import { useTranslations } from "use-intl";
import Button from "@components/ui/Buttons/Button";
import type { FormError } from "@utils/types";
import { toast } from "sonner";
import ErrorHelpers from "@utils/helpers/error.helpers";
import type {
  HissatsuLocale,
  HissatsuNames,
  IHissatsu,
  IHissatsuData,
  IHissatsuFormData,
} from "@hissatsu/hissatsu.types";
import SelectInput from "@components/ui/Inputs/SelectInput";
// import { createHissatsuAction, updateHissatsuAction } from "@/actions/hissatsu.actions";
import { useRouter } from "next/navigation";
import { elements } from "@domain/shared/variables";
import { hissatsuCharacteristics, hissatsuTypes } from "@hissatsu/hissatsu.variables";

type HissatsuType = Partial<IHissatsuFormData> | Partial<IHissatsuData> | Partial<IHissatsu>;

interface IProps extends React.HTMLAttributes<HTMLFormElement> {
  hissatsu?: HissatsuType;
  onFormChange?: (hissatsu: IHissatsuFormData) => void;
  submitLabel?: string;
  onFormSubmit?: (hissatsu: IHissatsuData) => void;
}

const HissatsuForm = ({ className, hissatsu, onFormChange, onFormSubmit, submitLabel, ...props }: IProps) => {
  const t = useTranslations();
  const isEditing = (hissatsu?: HissatsuType): hissatsu is IHissatsu =>
    !!hissatsu && typeof (hissatsu as Partial<IHissatsu>).id === "string";
  const isEdit = isEditing(hissatsu);
  const form = isEdit ? "updateHissatsuForm" : "newHissatsuForm";
  const router = useRouter();
  const [data, setData] = useState<IHissatsuFormData>({
    name: hissatsu?.name || "",
    names: hissatsu?.names || {},
    element: hissatsu?.element || undefined,
    type: hissatsu?.type || undefined,
    power: hissatsu?.power || undefined,
    cost: hissatsu?.cost || undefined,
    characteristic: hissatsu?.characteristic || undefined,
  });
  const [errors, setErrors] = useState<FormError[]>([]);

  const handleChange = (field: string, value: any) => {
    setData((prev) => {
      const newData: IHissatsuFormData = { ...prev };
      if (field.includes("fr_") || field.includes("en_") || field.includes("jp_")) {
        const split = field.split("_");
        const lang = split[0] as HissatsuLocale;
        const fieldName = split[1] as keyof HissatsuNames;
        const names: Partial<HissatsuNames> = {
          ...(prev.names || {}),
          [lang]: prev.names ? prev.names[fieldName] : "",
        };

        newData.names = names;
      } else {
        (newData as any)[field] = value;
      }

      if (onFormChange) {
        onFormChange(newData);
      }
      return newData;
    });
  };

  const checkErrors = (data: Partial<IHissatsuFormData>): data is IHissatsuData => {
    const errors: FormError[] = [];
    const { names, element, cost, name, power, type } = data;
    if (!name) {
      errors.push({ field: `name`, message: t("errors.common.required") });
    }
    if (!element) {
      errors.push({ field: `element`, message: t("errors.common.required") });
    }
    if (!type) {
      errors.push({ field: `type`, message: t("errors.common.required") });
    }
    if (typeof power !== "number") {
      errors.push({ field: `power`, message: t("errors.common.required") });
    }
    if (typeof cost !== "number") {
      errors.push({ field: `cost`, message: t("errors.common.required") });
    }
    if (!names?.fr) {
      errors.push({ field: `names.fr`, message: t("errors.common.required") });
    }
    if (!names?.en) {
      errors.push({ field: `names.en`, message: t("errors.common.required") });
    }
    if (!names?.jp) {
      errors.push({ field: `names.jp`, message: t("errors.common.required") });
    }

    setErrors(errors);
    return errors.length === 0;
  };

  const handleSubmit = () => {
    if (checkErrors(data)) {
      if (onFormSubmit) {
        onFormSubmit(data);
      } else {
        // let promise: Promise<any>;
        // if (isEdit) {
        //   promise = updateHissatsuAction(hissatsu.id, data);
        // } else {
        //   promise = createHissatsuAction(data);
        // }
        // toast.promise(promise, {
        //   success: (result) => {
        //     router.push(`/hissatsus/${isEdit ? `${hissatsu.id}` : `${result}`}`);
        //     return t(`components.hissatsu.${form}.toasts.success`);
        //   },
        //   error: (e) => {
        //     const error = ErrorHelpers.parse(e);
        //     const explanation = error.messageKey || `components.hissatsu.${form}.toasts.error`;
        //     if (error.hasFields()) {
        //       setErrors(error.data.fields.map(({ field, message }) => ({ field, message: t(message) })));
        //     }
        //     return t(explanation);
        //   },
        //   loading: t(`components.hissatsu.${form}.toasts.loading`),
        // });
      }
    }
  };

  return (
    <form {...props} className={["space-y-4", className].join(" ")}>
      <h2>{t("components.hissatsu.newHissatsuForm.sections.general")}</h2>
      <div className="flex flex-wrap gap-10">
        <div className="flex-1 space-y-1">
          <h3>{t("components.hissatsu.newHissatsuForm.sections.frName")}</h3>
          <TextInput
            id="fr_name"
            label={t("hissatsu.properties.name")}
            value={data.names?.fr || ""}
            handleChange={(value) => handleChange("fr_name", value)}
            error={errors.find((e) => e.field === "fr_name")?.message}
            required
          />
        </div>
        <div className="flex-1 space-y-1">
          <h3>{t("components.hissatsu.newHissatsuForm.sections.enName")}</h3>
          <TextInput
            id="en_name"
            label={t("hissatsu.properties.name")}
            value={data.names?.en || ""}
            handleChange={(value) => handleChange("en_name", value)}
            error={errors.find((e) => e.field === "en_name")?.message}
            required
          />
        </div>
        <div className="flex-1 space-y-1">
          <h3>{t("components.hissatsu.newHissatsuForm.sections.jpName")}</h3>
          <TextInput
            id="jp_name"
            label={t("hissatsu.properties.name")}
            value={data.names?.jp || ""}
            handleChange={(value) => handleChange("jp_name", value)}
            error={errors.find((e) => e.field === "jp_name")?.message}
            required
          />
        </div>
      </div>

      <SelectInput
        id="element"
        label={t("hissatsu.properties.element")}
        value={data.element || ""}
        options={elements.map((pos) => ({ value: pos, label: t(`elements.${pos}`) }))}
        handleChange={(value) => handleChange("element", value)}
        error={errors.find((e) => e.field === "element")?.message}
        required
      />
      <SelectInput
        id="type"
        label={t("hissatsu.properties.type")}
        value={data.type || ""}
        options={hissatsuTypes.map((pos) => ({ value: pos, label: t(`hissatsu.types.${pos}`) }))}
        handleChange={(value) => handleChange("type", value)}
        error={errors.find((e) => e.field === "type")?.message}
        required
      />
      <SelectInput
        id="characteristic"
        label={t("hissatsu.properties.characteristic")}
        value={data.characteristic || ""}
        options={hissatsuCharacteristics.map((pos) => ({ value: pos, label: t(`hissatsu.characteristics.${pos}`) }))}
        handleChange={(value) => handleChange("characteristic", value)}
        error={errors.find((e) => e.field === "characteristic")?.message}
        required
      />

      <Button className="mx-auto flex" template="blue" onClick={handleSubmit}>
        {submitLabel || t("common.buttons.submit")}
      </Button>
    </form>
  );
};

export default HissatsuForm;
