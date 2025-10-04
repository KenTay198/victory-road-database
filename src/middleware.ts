import createMiddleware from "next-intl/middleware";
import { locales } from "./translations/intl";

export default createMiddleware({
  locales: locales,
  defaultLocale: "en",
  localeDetection: true,
});

export const config = {
  matcher: ["/", "/(fr|en)/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
