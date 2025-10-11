import Banner from "@components/ui/Layout/Banner";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import HissatsuTable from "@components/hissatsus/HissatsuTable/HissatsuTable";
import { findAllHissatsusAction } from "@/actions/hissatsu.actions";

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations("pages.hissatsus.metadata");

  return {
    title: t("title"),
    description: t("description"),
  };
};

const HissatsusListPage = async () => {
  const t = await getTranslations("pages.hissatsus");
  const hissatsus = await findAllHissatsusAction();

  return (
    <>
      <Banner title={t("header")} path={[{ value: "hissatsus" }]} />
      <HissatsuTable className="overflow-x-auto" hissatsus={hissatsus} />
    </>
  );
};

export default HissatsusListPage;
