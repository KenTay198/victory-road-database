import Button from "@components/ui/Buttons/Button";
import Banner from "@components/ui/Layout/Banner";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations("pages.admin.metadata");

  return {
    title: `${t("title")} | Victory Road Database`,
    description: t("description"),
  };
};

const AdminPage = async () => {
  const t = await getTranslations();

  return (
    <>
      <Banner title={t("pages.admin.header")} path={[{ value: "admin" }]} />
      <div className="flex flex-wrap gap-4">
        <Button template="blue" link="/admin/characters">
          {t("common.entities.character", { plural: "s" })}
        </Button>
        <Button template="blue" link="/admin/hissatsus">
          {t("common.entities.hissatsu", { plural: "s" })}
        </Button>
      </div>
    </>
  );
};

export default AdminPage;
