"use client";
import Button from "@components/ui/Buttons/Button";
import { useTranslations } from "next-intl";

interface IProps<T> extends React.HTMLAttributes<HTMLButtonElement> {
  findAllFunction: () => Promise<T[]>;
  transformFunction?: (item: T) => any;
  fileName: string;
  confirmMessage?: string;
}

const ExportEntitiesButton = <T,>({ className, findAllFunction, transformFunction, fileName, ...props }: IProps<T>) => {
  const t = useTranslations();

  const handleClick = () => {
    const confirmed = window.confirm(props.confirmMessage || "Are you sure you want to export all data ?");
    if (confirmed) {
      findAllFunction().then((items) => {
        const exported = items.map((e) => {
          return transformFunction ? transformFunction(e) : e;
        });

        const dataStr = JSON.stringify(exported, null, 2);
        const blob = new Blob([dataStr], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${fileName}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      });
    }
  };

  return (
    <Button {...props} onClick={handleClick} template="blue">
      {t("common.buttons.export")}
    </Button>
  );
};

export default ExportEntitiesButton;
