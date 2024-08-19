"use server";
import { IRoster } from "@/types/roster.types";
import { revalidateTag } from "next/cache";

interface IPostRoster {
  name: string;
  characters: string[];
  owner: string;
}

type Query = "completeCharacters";

export const getRosters = async (query?: Partial<Record<Query, any>>) => {
  const params = new URLSearchParams(query);
  return new Promise<IRoster[]>((resolve, reject) => {
    fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/rosters?${params.toString()}`,
      {
        method: "GET",
        next: { tags: ["/rosters"] },
      }
    )
      .then(async (response) => {
        const data = await response.json().catch(reject);

        if (!response.ok)
          throw new Error(data.error || "An unexpected error occurred");

        resolve(data);
      })
      .catch(reject);
  });
};

export const getRosterById = async (
  id: string,
  query?: Partial<Record<Query, any>>
) => {
  const params = new URLSearchParams(query);
  return new Promise<IRoster>((resolve, reject) => {
    fetch(
      `${
        process.env.NEXT_PUBLIC_SITE_URL
      }/api/rosters/${id}?${params.toString()}`,
      {
        method: "GET",
        next: { tags: ["/rosters/" + id] },
      }
    )
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

export const getRostersByUser = async (
  userId: string,
  query?: Partial<Record<Query, any>>
) => {
  const params = new URLSearchParams(query);
  return new Promise<IRoster[]>((resolve, reject) => {
    fetch(
      `${
        process.env.NEXT_PUBLIC_SITE_URL
      }/api/rosters/user/${userId}?${params.toString()}`,
      {
        method: "GET",
        next: { tags: [`/rosters/user/${userId}`] },
      }
    )
      .then(async (response) => {
        const data = await response.json().catch(reject);

        if (!response.ok)
          throw new Error(data.error || "An unexpected error occurred");

        resolve(data);
      })
      .catch(reject);
  });
};

export const postRoster = async (data: Partial<IPostRoster>) => {
  return new Promise<IRoster>((resolve, reject) => {
    fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/rosters`, {
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

        revalidateTag("/rosters");
        if (data.owner) revalidateTag(`/rosters/user/${data.owner}`);
        resolve(data);
      })
      .catch(reject);
  });
};

export const putRoster = async (id: string, data: Partial<IPostRoster>) => {
  return new Promise<IRoster>((resolve, reject) => {
    fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/rosters/${id}`, {
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

        revalidateTag("/rosters");
        if (data.owner) revalidateTag(`/rosters/user/${data.owner}`);
        revalidateTag(`/rosters/${id}`);
        resolve(data);
      })
      .catch(reject);
  });
};

export const deleteRoster = async (id: string) => {
  return new Promise<IRoster>((resolve, reject) => {
    fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/rosters/${id}`, {
      method: "DELETE",
    })
      .then(async (response) => {
        const data = await response.json().catch(reject);

        if (!response.ok)
          throw new Error(data.error || "An unexpected error occurred");

        revalidateTag("/rosters");
        if (data.owner) revalidateTag(`/rosters/user/${data.owner}`);
        revalidateTag(`/rosters/${id}`);
        resolve(data);
      })
      .catch(reject);
  });
};
