import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import LoginForm from "@components/auth/LoginForm";
import { getCurrentUserAction } from "@/actions/auth.actions";
import { redirect } from "next/navigation";

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations("pages.login.metadata");

  return {
    title: `${t("title")} | Victory Road Database`,
    description: t("description"),
  };
};

const LoginPage = async () => {
  const t = await getTranslations("pages.login");

  const user = await getCurrentUserAction();
  if (user) {
    return redirect("/");
  }

  return (
    <>
      <h1>{t("header")}</h1>
      <LoginForm />
    </>
  );
};

export default LoginPage;
