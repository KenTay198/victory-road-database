import React from "react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import RegisterForm from "@components/auth/RegisterForm";
import { getCurrentUserAction } from "@/actions/auth.actions";
import { redirect } from "next/navigation";

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations("pages.register.metadata");

  return {
    title: t("title"),
    description: t("description"),
  };
};

const RegisterPage = async () => {
  const t = await getTranslations("pages.register");

  const user = await getCurrentUserAction();
  if (user) {
    return redirect("/");
  }

  return (
    <>
      <h1>{t("header")}</h1>
      <RegisterForm />
    </>
  );
};

export default RegisterPage;
