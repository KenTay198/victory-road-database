"use server";
import { ICharacter, ICharacterHissatsu, ICompleteCharacter, IStatistics } from "@/types/character.types";
import { revalidateTag } from "next/cache";

interface IPostCharacter extends Omit<Partial<ICharacter>, "hissatsus" | "statistics" | "element" | "defaultPosition"> {
  hissatsus?: Partial<ICharacterHissatsu>[];
  statistics?: Partial<IStatistics>;
  element?: string;
  defaultPosition?: string;
}

type Query = "completeHissatsus";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const getCharacters = async (query?: Partial<Record<Query, any>>) => {
  const params = new URLSearchParams(query);
  return new Promise<ICharacter[]>((resolve, reject) => {
    fetch(`${siteUrl}/api/characters?${params.toString()}`, {
      method: "GET",
      next: { tags: ["/characters"] },
    })
      .then(async (response) => {
        const data = await response.json().catch(reject);

        if (!response.ok) throw new Error(data.error || "An unexpected error occurred");

        resolve(data);
      })
      .catch(reject);
  });
};

export const getCharacterById = async (id: string, query?: Partial<Record<Query, any>>) => {
  const params = new URLSearchParams(query);
  return new Promise<ICharacter>((resolve, reject) => {
    fetch(`${siteUrl}/api/characters/${id}?${params.toString()}`, {
      method: "GET",
      next: { tags: ["/characters/" + id] },
    })
      .then(async (response) => {
        const data = await response.json().catch(reject);

        if (!response.ok) throw new Error(data.error || "An unexpected error occurred");

        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getCompleteCharacterById = async (id: string) => {
  return new Promise<ICompleteCharacter>((resolve, reject) => {
    fetch(`${siteUrl}/api/characters/${id}/complete`, {
      method: "GET",
      next: { tags: ["/characters/" + id, "/characters/complete"] },
    })
      .then(async (response) => {
        const data = await response.json().catch(reject);

        if (!response.ok) throw new Error(data.error || "An unexpected error occurred");

        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const postCharacter = async (data: IPostCharacter) => {
  return new Promise<ICharacter>((resolve, reject) => {
    fetch(`${siteUrl}/api/characters`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        const data = await response.json().catch(reject);

        if (!response.ok) throw new Error(data.error || "An unexpected error occurred");

        revalidateTag(`/characters`);
        revalidateTag(`/characters/complete`);
        resolve(data);
      })
      .catch(reject);
  });
};

export const putCharacter = async (id: string, data: IPostCharacter) => {
  return new Promise<ICharacter>((resolve, reject) => {
    fetch(`${siteUrl}/api/characters/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        const data = await response.json().catch(reject);

        if (!response.ok) throw new Error(data.error || "An unexpected error occurred");

        revalidateTag(`/characters`);
        revalidateTag(`/characters/${id}`);
        revalidateTag(`/characters/complete`);
        resolve(data);
      })
      .catch(reject);
  });
};

export const deleteCharacter = async (id: string) => {
  return new Promise<void>((resolve, reject) => {
    fetch(`${siteUrl}/api/characters/${id}`, {
      method: "DELETE",
    })
      .then(async (response) => {
        const data = await response.json().catch(reject);

        if (!response.ok) throw new Error(data.error || "An unexpected error occurred");

        revalidateTag(`/characters`);
        revalidateTag(`/characters/${id}`);
        revalidateTag(`/characters/complete`);
        resolve();
      })
      .catch(reject);
  });
};

export const deleteMultipleCharacters = async (ids: string[]) => {
  return new Promise<void>((resolve, reject) => {
    fetch(`${siteUrl}/api/characters/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ids }),
    })
      .then(async (response) => {
        const data = await response.json().catch(reject);

        if (!response.ok) throw new Error(data.error || "An unexpected error occurred");

        revalidateTag(`/characters`);
        revalidateTag(`/characters/complete`);
        for (const id of ids) revalidateTag(`/characters/${id}`);
        resolve();
      })
      .catch(reject);
  });
};

export const fetchFandomCharacters = async () => {
  return new Promise<ReadableStream<any>>((resolve, reject) => {
    fetch(`${siteUrl}/api/characters/fetch`)
      .then(async (res) => {
        if (!res.ok) return reject("An error has occured.");

        const reader = res.body;

        if (!reader) return reject("No reader found.");

        resolve(reader);
      })
      .catch(reject);
  });
};
