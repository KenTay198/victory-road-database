import Sidebar from "@components/ui/Layout/Sidebar";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full max-w-screen max-h-screen">
      <Sidebar />
      <main className="px-5 py-2 w-full overflow-auto">{children}</main>
    </div>
  );
}
