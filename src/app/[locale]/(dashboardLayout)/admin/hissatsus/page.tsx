import ExportHissatsusButton from "@components/admin/hissatsus/ExportHissatsusButton";
import Button from "@components/ui/Buttons/Button";
import Banner from "@components/ui/Layout/Banner";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations("pages.admin.hissatsus.metadata");

  return {
    title: `${t("title")} | Victory Road Database`,
    description: t("description"),
  };
};

const AdminHissatsusPage = async () => {
  const t = await getTranslations();

  return (
    <>
      <Banner title={t("pages.admin.hissatsus.header")} path={[{ value: "admin" }, { value: "hissatsus" }]} />
      <div className="flex flex-wrap gap-4">
        <ExportHissatsusButton className="w-fit" />
        <Button template="blue" link="/admin/hissatsus/import" className="w-fit">
          {t("common.buttons.import")}
        </Button>
      </div>
    </>
  );
};

export default AdminHissatsusPage;
