import ExportCharactersButton from "@components/admin/characters/ExportCharactersButton";
import Button from "@components/ui/Buttons/Button";
import Banner from "@components/ui/Layout/Banner";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations("pages.admin.characters.metadata");

  return {
    title: `${t("title")} | Victory Road Database`,
    description: t("description"),
  };
};

const AdminCharactersPage = async () => {
  const t = await getTranslations();

  return (
    <>
      <Banner title={t("pages.admin.characters.header")} path={[{ value: "admin" }, { value: "characters" }]} />
      <div className="flex flex-wrap gap-4">
        <ExportCharactersButton className="w-fit" />
        <Button template="blue" link="/admin/characters/import" className="w-fit">
          {t("common.buttons.import")}
        </Button>
      </div>
    </>
  );
};

export default AdminCharactersPage;
