import LocaleSwitcher from "@components/ui/LocaleSwitcher";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex items-center justify-center bg-raimon-yellow w-screen h-screen">
      <main className="bg-white max-w-[1000px] w-full rounded-lg p-5 overflow-auto">{children}</main>
      <LocaleSwitcher divClassName="absolute bottom-4 right-4" />
    </div>
  );
}
