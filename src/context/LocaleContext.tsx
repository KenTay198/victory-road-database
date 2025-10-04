"use client";
import { usePathname, useRouter } from "next/navigation";
import type { Locale } from "next-intl";
import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { defaultLocale, isValidLocale } from "@/translations/intl";

interface ILocaleContext {
  locale: Locale;
  updateLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<ILocaleContext>({} as ILocaleContext);

export const useLocale = () => {
  const context = useContext(LocaleContext);
  return context;
};

export default function LocaleProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [locale, setLocale] = useState<Locale>(defaultLocale);

  useEffect(() => {
    const pathLocale = pathname?.split("/")[1];
    if (isValidLocale(pathLocale)) {
      setLocale(pathLocale);
    }
  }, [pathname]);

  const updateLocale = (newLocale: Locale) => {
    if (isValidLocale(newLocale) && newLocale !== locale) {
      const segments = pathname.split("/");
      segments[1] = newLocale;
      const newPath = segments.join("/");
      router.push(newPath);
    }
  };

  return (
    <LocaleContext.Provider value={{ locale, updateLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}
