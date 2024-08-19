"use server";
import IHissatsu from "@/types/hissatsu.types";
import { revalidatePath } from "next/cache";

export const getHissatsus = async () => {
  return new Promise<IHissatsu[]>((resolve, reject) => {
    fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/hissatsus`, {
      method: "GET",
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

export const getHissatsuById = async (id: string) => {
  return new Promise<IHissatsu | void>((resolve, reject) => {
    fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/hissatsus/${id}`, {
      method: "GET",
    })
      .then(async (response) => {
        const data = await response.json().catch(reject);

        if (!response.ok)
          throw new Error(data.error || "An unexpected error occurred");

        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const postHissatsu = async (data: Partial<IHissatsu>) => {
  return new Promise<IHissatsu>((resolve, reject) => {
    fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/hissatsus`, {
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

        revalidatePath(`/hissatsus`);
        resolve(data);
      })
      .catch(reject);
  });
};

export const putHissatsu = async (id: string, data: Partial<IHissatsu>) => {
  return new Promise<IHissatsu>((resolve, reject) => {
    fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/hissatsus/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        const data = await response.json().catch(reject);

        if (!response.ok)
          throw new Error(data.error || "An unexpected error occurred");

        revalidatePath(`/hissatsus`);
        revalidatePath(`/hissatsus/${id}`);
        resolve(data);
      })
      .catch(reject);
  });
};

export const deleteHissatsu = async (id: string) => {
  return new Promise<IHissatsu>((resolve, reject) => {
    fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/hissatsus/${id}`, {
      method: "DELETE",
    })
      .then(async (response) => {
        const data = await response.json().catch(reject);

        if (!response.ok)
          throw new Error(data.error || "An unexpected error occurred");

        revalidatePath(`/hissatsus`);
        revalidatePath(`/hissatsus/${id}`);
        resolve(data);
      })
      .catch(reject);
  });
};
