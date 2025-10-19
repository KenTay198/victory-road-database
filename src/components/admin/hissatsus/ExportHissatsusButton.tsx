"use client";
import type { IHissatsu } from "@hissatsu/hissatsu.types";
import ExportEntitiesButton from "../common/ExportEntitiesButton";
import { findAllHissatsusAction } from "@/actions/hissatsu.actions";

const ExportHissatsusButton = ({ className, ...props }: React.HTMLAttributes<HTMLButtonElement>) => {
  const transformFunction = (e: IHissatsu) => {
    const hissatsu: any = { ...e };
    delete hissatsu.id;
    return hissatsu;
  };

  return (
    <ExportEntitiesButton<IHissatsu>
      {...props}
      findAllFunction={() => findAllHissatsusAction()}
      transformFunction={transformFunction}
      fileName="hissatsus_export"
    />
  );
};

export default ExportHissatsusButton;
