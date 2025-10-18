import UpdateMetaButton from "@components/admin/meta/UpdateMetaButton";
import Banner from "@components/ui/Layout/Banner";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations("pages.admin.meta.metadata");

  return {
    title: `${t("title")} | Victory Road Database`,
    description: t("description"),
  };
};

const AdminMetaPage = async () => {
  const t = await getTranslations("pages.admin.meta");

  return (
    <>
      <Banner title={t("header")} path={[{ value: "admin" }, { value: "meta" }]} />
      <div className="flex flex-wrap gap-4">
        <UpdateMetaButton />
      </div>
    </>
  );
};

export default AdminMetaPage;
