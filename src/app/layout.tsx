import React from "react";
import "@styles/globals.scss";
import DefaultLayout from "@layouts/DefaultLayout/DefaultLayout";
import Providers from "@layouts/Providers";
import ProtectedRoute from "@layouts/ProtectedRoute";

export const metadata = {
  title: "Victory Road Database",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <DefaultLayout>{children}</DefaultLayout>
        </Providers>
      </body>
    </html>
  );
}
