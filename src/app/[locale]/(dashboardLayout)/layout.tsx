import Header from "@components/ui/Layout/Header";
import Sidebar from "@components/ui/Layout/Sidebar";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full max-w-screen max-h-screen">
      <Sidebar />
      <div className="px-5 py-2 w-full overflow-auto relative">
        <Header />
        <main>{children}</main>
      </div>
    </div>
  );
}
