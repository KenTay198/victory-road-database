import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/translations/intl.ts");

const nextConfig: NextConfig = {
  turbopack: {},
};

export default withNextIntl(nextConfig);
