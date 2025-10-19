"use client";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { FaCheckCircle, FaTimesCircle, FaTrash } from "react-icons/fa";
import Button from "@components/ui/Buttons/Button";
import { toast } from "sonner";
import type { IImportEntitiesResultsProps } from "./ImportEntities";

interface IProps extends IImportEntitiesResultsProps<any> {
  items: any[];
}

type Status = "deleted" | "validated";

const ImportEntitiesResults = ({
  onSubmitData: onSubmit,
  items,
  getId,
  EntityBarComponent,
  FormComponent,
  entityName = "items",
}: IProps) => {
  const t = useTranslations();
  const [datas, setDatas] = useState<any[]>(items);

  const handleChangeStatus = (index: number, status: Status) => {
    setDatas((prev) => prev.map((char, i) => (i === index ? { ...char, status } : char)));
  };

  const handleDataChange = (index: number, data: any) => {
    setDatas((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], ...data };
      return updated;
    });
  };

  const checkValidated = (characters: any[]): characters is any[] => {
    return characters.length > 0;
  };

  const handleSubmit = () => {
    const dataToSend = [...datas].filter((e) => e.status === "validated").map(({ status, ...e }) => e);
    if (checkValidated(dataToSend)) {
      onSubmit(dataToSend);
    } else {
      toast.error("Missing validations");
    }
  };

  return (
    <div>
      <h2>Import Results</h2>
      <p>
        Retrieved {datas.length} {entityName}.
      </p>
      <p>Click on an item to edit their details. Every item should be validated to submit the form.</p>
      <div className="space-y-4">
        {items.map((item, index) => {
          const data = datas[index];
          if (data?.status === "deleted") return null;
          return (
            <ExpandableResult
              key={getId(item, index)}
              item={item}
              validated={data?.status === "validated"}
              onDelete={() => handleChangeStatus(index, "deleted")}
              onValidate={() => handleChangeStatus(index, "validated")}
              onDataChange={(data) => handleDataChange(index, data)}
              EntityBarComponent={EntityBarComponent}
              FormComponent={FormComponent}
            />
          );
        })}
      </div>
      <Button onClick={handleSubmit} disabled={datas.every((e) => e.status !== "validated")} template="blue">
        {t("common.buttons.submit")}
      </Button>
    </div>
  );
};

interface IExpandableResultProps {
  item: any;
  validated: boolean;
  EntityBarComponent: IImportEntitiesResultsProps<any>["EntityBarComponent"];
  FormComponent: IImportEntitiesResultsProps<any>["FormComponent"];
  onDelete: () => void;
  onDataChange: (data: any) => void;
  onValidate: () => void;
}

const ExpandableResult = ({
  item,
  EntityBarComponent,
  FormComponent,
  onDelete,
  onDataChange,
  onValidate,
  validated,
}: IExpandableResultProps) => {
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
          <EntityBarComponent item={item} />
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
        <FormComponent item={item} onDataChange={onDataChange} onValidate={handleValidate} />
      </div>
    </div>
  );
};

export default ImportEntitiesResults;
