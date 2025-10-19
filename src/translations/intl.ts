import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

type Locale = "en" | "fr";
const locales: Locale[] = ["en", "fr"];
const defaultLocale: Locale = "en";

export const isValidLocale = (locale: string | undefined): locale is Locale => {
  return locales.includes(locale as Locale);
};

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;
  if (!isValidLocale(locale)) notFound();

  return {
    locale,
    messages: (await import(`./messages/${locale}.ts`)).default,
  };
});

export { locales, defaultLocale, type Locale };
