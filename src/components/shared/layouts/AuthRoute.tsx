"use client";
import { isAuth } from "@/controllers/users.controller";
import { useAuthState } from "@context/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

interface IProps {
  children: React.ReactNode;
}

function AuthRoute({ children }: IProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { setUser, setAuthLoading } = useAuthState();

  useEffect(() => {
    async function CheckAuth() {
      try {
        const user = await isAuth();
        if (!user && pathname !== "/login") router.push("/login");
        setUser(user);
      } catch (error : any) {
        console.log(error.message);
      } finally {
        setAuthLoading(false);
      }
    }

    CheckAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
}

export default AuthRoute;
