import type { Metadata } from "next";
import "@styles/globals.css";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { isValidLocale } from "@/translations/intl";
import Providers from "@components/ui/Providers";

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations("pages.home.metadata");

  return {
    title: t("title"),
    description: t("description"),
  };
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: any;
}>) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
