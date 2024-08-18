"use server";
import IHissatsu from "@/types/hissatsu.types";
import { revalidatePath } from "next/cache";

export const getHissatsus = async () => {
  return new Promise<IHissatsu[]>((resolve, reject) => {
    fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/hissatsus`, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add hissatsu");
        }

        response.json().then(resolve).catch(reject);
      })
      .catch(reject);
  });
};

export const getHissatsuById = async (id: string) => {
  return new Promise<IHissatsu>((resolve, reject) => {
    fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/hissatsus/${id}`, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add hissatsu");
        }

        response.json().then(resolve).catch(reject);
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
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add hissatsu");
        }

        revalidatePath(`/hissatsus`);
        response.json().then(resolve).catch(reject);
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
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update hissatsu");
        }
        revalidatePath(`/hissatsus`);
        revalidatePath(`/hissatsus/${id}`);
        response.json().then(resolve).catch(reject);
      })
      .catch(reject);
  });
};

export const deleteHissatsu = async (id: string) => {
  return new Promise<IHissatsu>((resolve, reject) => {
    fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/hissatsus/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete hissatsu");
        }
        revalidatePath(`/hissatsus`);
        revalidatePath(`/hissatsus/${id}`);
        response.json().then(resolve).catch(reject);
      })
      .catch(reject);
  });
};
