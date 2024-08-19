import React from "react";
import DashboardLayout from "@layouts/DashboardLayout";

export const metadata = {
  title: "Dashboard | Victory Road Database",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
