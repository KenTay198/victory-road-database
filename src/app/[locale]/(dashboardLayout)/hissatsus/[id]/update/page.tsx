import { cache } from "react";
import Banner from "@components/ui/Layout/Banner";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import HissatsuForm from "@components/hissatsus/HissatsuForm";
import AdminRoute from "@components/auth/AdminRoute";
import { findHissatsuByIdAction } from "@/actions/hissatsu.actions";
import { notFound } from "next/navigation";
import { getPageContext } from "@/actions/page.actions";

const getHissatsu = cache(async (id: string, params?: any) => {
  return await findHissatsuByIdAction(id, params);
});

export const generateMetadata = async ({ params }: any): Promise<Metadata> => {
  const t = await getTranslations("pages.hissatsus.hissatsu.update.metadata");
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

const UpdateHissatsuPage = async ({ params }: any) => {
  const t = await getTranslations("pages.hissatsus.hissatsu.update");
  const { id } = await params;
  const { settings } = await getPageContext();
  const hissatsu = await getHissatsu(id, { locale: settings.hissatsuLocale });
  if (!hissatsu) {
    return notFound();
  }

  return (
    <AdminRoute>
      <Banner
        title={t("header", { HissatsuName: hissatsu.name })}
        path={[{ value: "hissatsus" }, { value: id, label: hissatsu.name }, { value: "update" }]}
      />
      <HissatsuForm hissatsu={hissatsu} className="max-w-[1000px] mx-auto" />
    </AdminRoute>
  );
};

export default UpdateHissatsuPage;
