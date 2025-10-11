import { getCurrentUserAction } from "@/actions/auth.actions";
import { notFound } from "next/navigation";

const AdminRoute = async ({ children }: React.HTMLAttributes<HTMLDivElement>) => {
  const user = await getCurrentUserAction();
  if (!user || user.role !== "admin") return notFound();
  return children;
};

export default AdminRoute;
