"use client";
import { useTranslations } from "next-intl";

export default function ErrorPage({ error }: { error: Error & { digest?: string } }) {
  const pageT = useTranslations("pages.error");
  const t = useTranslations("errors");

  return (
    <>
      <h1>{pageT("header")}</h1>
      <p>{t(error.message)}</p>
    </>
  );
}
