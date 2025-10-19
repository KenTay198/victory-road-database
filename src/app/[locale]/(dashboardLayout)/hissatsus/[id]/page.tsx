import { cache } from "react";
import HissatsuView from "@components/hissatsus/HissatsuView";
import Banner from "@components/ui/Layout/Banner";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { findHissatsuByIdAction } from "@/actions/hissatsu.actions";
import Button from "@components/ui/Buttons/Button";
import { GrUpdate } from "react-icons/gr";
import { getPageContext } from "@/actions/page.actions";

const getHissatsu = cache(async (id: string, params?: any) => {
  return await findHissatsuByIdAction(id, params);
});

export const generateMetadata = async ({ params }: any): Promise<Metadata> => {
  const t = await getTranslations("pages.hissatsus.hissatsu.metadata");
  const { id } = await params;
  const hissatsu = await getHissatsu(id);
  if (!hissatsu) {
    return notFound();
  }
  return {
    title: t("title", { HissatsuName: hissatsu.name }),
    description: t("description", { HissatsuName: hissatsu.name }),
  };
};

const HissatsuPage = async ({ params }: any) => {
  const t = await getTranslations("pages.hissatsus.hissatsu");
  const { id } = await params;
  const { user, settings } = await getPageContext();
  const hissatsu = await getHissatsu(id, { locale: settings.hissatsuLocale });
  if (!hissatsu) {
    return notFound();
  }

  return (
    <>
      <Banner
        title={t("header", { HissatsuName: hissatsu.name })}
        path={[{ value: "hissatsus" }, { value: id, label: hissatsu.name }]}
      />
      {user?.role === "admin" && (
        <Button template="blue" link={`/hissatsus/${id}/update`} className="mb-8 flex gap-2 items-center">
          <GrUpdate size={18} />
          {t("actions.update")}
        </Button>
      )}
      <HissatsuView hissatsu={hissatsu} className="ml-4" />
    </>
  );
};

export default HissatsuPage;
