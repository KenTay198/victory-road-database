import React from "react";

export const metadata = {
  title: "Character list | Victory Road Database",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
