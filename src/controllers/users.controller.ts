"use server";

import { IUser } from "@/types/user.types";
import { cookies } from "next/headers";

export const register = async (data: {
  username: string;
  email: string;
  password: string;
}) => {
  return new Promise((resolve, reject) => {
    fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        const data = await response.json().catch(reject);

        if (!response.ok)
          throw new Error(data.error || "An unexpected error occurred");

        resolve(data);
      })
      .catch(reject);
  });
};

export const login = async (data: { identifier: string; password: string }) => {
  return new Promise<void>((resolve, reject) => {
    fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        const data = await response.json().catch(reject);

        if (!response.ok)
          throw new Error(data.error || "An unexpected error occurred");

        if (!process.env.JWT_COOKIE_NAME)
          throw new Error("No cookie name defined");

        cookies().set({
          name: process.env.JWT_COOKIE_NAME,
          value: data,
          httpOnly: true,
          sameSite: true,
          secure: process.env.ENVIRONMENT === "prod",
          maxAge: 60 * 60 * 24 * 7,
        });
        resolve();
      })
      .catch(reject);
  });
};

export const isAuth = async () => {
  if (!process.env.JWT_COOKIE_NAME) throw new Error("No cookie name defined");
  const token = cookies().get(process.env.JWT_COOKIE_NAME)?.value;
  if (!token) throw new Error("No token provided");
  return new Promise<IUser>((resolve, reject) => {
    fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/isAuth`, {
      method: "GET",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    })
      .then(async (response) => {
        const data = await response.json().catch(reject);

        if (!response.ok)
          throw new Error(data.error || "An unexpected error occurred");

        cookies().set({
          name: "victory-road-user-id",
          value: data._id,
          httpOnly: true,
          sameSite: true,
          secure: process.env.ENVIRONMENT === "prod",
          maxAge: 60 * 60 * 24 * 7,
        });

        resolve(data);
      })
      .catch(reject);
  });
};
