"use client";
import { isAuth } from "@/controllers/users.controller";
import { useAuthState } from "@context/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

interface IProps {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: IProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { setUser } = useAuthState();

  useEffect(() => {
    isAuth()
      .then((user) => {
        if (pathname === "/login") router.push("/");
        setUser(user);
      })
      .catch((err) => console.log(err.message));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
}

export default ProtectedRoute;
