"use client";
import HissatsuForm from "@components/hissatsus/HissatsuForm";
import ImportEntities, {
  type IEntityBarComponentProps,
  type IFormComponentProps,
  type ImportSource,
} from "../common/ImportEntities";
import type { IHissatsuData, IHissatsuFormData } from "@hissatsu/hissatsu.types";
import { toast } from "sonner";
import { createHissatsusAction } from "@/actions/hissatsu.actions";
import { useRouter } from "next/navigation";
import ErrorHelpers from "@utils/helpers/error.helpers";
import { useTranslations } from "next-intl";

const ImportHissatsus = ({ className, ...props }: React.HTMLAttributes<HTMLFormElement>) => {
  const t = useTranslations();
  const router = useRouter();

  const handleDataValidated = (source: ImportSource, data: any[]) => {
    let hissatsus: Partial<IHissatsuData>[] = [];
    switch (source) {
      case "mongo":
        hissatsus = data.map((json) => {
          return {
            name: json.name,
            names: json.names || {
              fr: json.name,
              en: json.name,
              jp: json.name,
            },
            description: json.description,
            power: json.power,
            cost: json.cost,
            element: json.element,
            type: json.type,
            characteristic: json.characteristic,
            learnLevel: json.learnLevel,
          };
        });
        break;
      default:
        break;
    }
    return hissatsus;
  };

  const handleSubmitData = async (data: IHissatsuData[]) => {
    toast.promise(createHissatsusAction(data), {
      success: () => {
        router.push("/hissatsus");
        return t(`components.hissatsu.importHissatsus.toasts.success`);
      },
      error: (e) => {
        const error = ErrorHelpers.parse(e);
        const explanation = error.messageKey || `components.hissatsu.importHissatsus.toasts.error`;
        return t(explanation);
      },
      loading: t(`components.hissatsu.importHissatsus.toasts.loading`),
    });
  };

  return (
    <ImportEntities
      {...props}
      onDataValidated={handleDataValidated}
      getId={(item, index) => `import-hissatsu-${item.name}-${index}`}
      onSubmitData={handleSubmitData}
      EntityBarComponent={HissatsuBarName}
      FormComponent={HissatsuFormComponent}
      entityName="hissatsus"
      translationKeys={{
        dataLabel: "components.hissatsu.importHissatsus.data.label",
        dataDescription: "components.hissatsu.importHissatsus.data.description",
      }}
    />
  );
};

const HissatsuBarName = (props: IEntityBarComponentProps<IHissatsuFormData>) => {
  return <span>{props.item.name}</span>;
};

const HissatsuFormComponent = (props: IFormComponentProps<IHissatsuFormData>) => {
  return (
    <HissatsuForm {...props} hissatsu={props.item} onFormChange={props.onDataChange} onFormSubmit={props.onValidate} />
  );
};

export default ImportHissatsus;
