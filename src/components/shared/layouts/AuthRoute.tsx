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
    isAuth()
      .then((user) => {
        if (pathname === "/login") router.push("/");
        setUser(user);
      })
      .catch((err) => console.log(err.message))
      .finally(() => setAuthLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
}

export default AuthRoute;
