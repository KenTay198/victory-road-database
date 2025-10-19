import Banner from "@components/ui/Layout/Banner";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import HissatsuForm from "@components/hissatsus/HissatsuForm";
import AdminRoute from "@components/auth/AdminRoute";

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations("pages.hissatsus.new.metadata");

  return {
    title: `${t("title")} | Victory Road Database`,
    description: t("description"),
  };
};

const NewHissatsuPage = async () => {
  const t = await getTranslations("pages.hissatsus.new");

  return (
    <AdminRoute>
      <Banner title={t("header")} path={[{ value: "hissatsus" }, { value: "new" }]} />
      <HissatsuForm className="max-w-[1000px]" />
    </AdminRoute>
  );
};

export default NewHissatsuPage;
