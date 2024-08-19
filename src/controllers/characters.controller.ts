"use server";
import {
  ICharacter,
  ICharacterHissatsu,
  IStatistics,
} from "@/types/character.types";
import { revalidatePath } from "next/cache";

interface IPostCharacter
  extends Omit<
    Partial<ICharacter>,
    "hissatsus" | "statistics" | "element" | "defaultPosition"
  > {
  hissatsus?: Partial<ICharacterHissatsu>[];
  statistics?: Partial<IStatistics>;
  element?: string;
  defaultPosition?: string;
}

type Query = "completeHissatsus";

export const getCharacters = async (query?: Partial<Record<Query, any>>) => {
  const params = new URLSearchParams(query);
  return new Promise<ICharacter[]>((resolve, reject) => {
    fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/characters?${params.toString()}`,
      {
        method: "GET",
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

export const getCharacterById = async (
  id: string,
  query?: Partial<Record<Query, any>>
) => {
  const params = new URLSearchParams(query);
  return new Promise<ICharacter>((resolve, reject) => {
    fetch(
      `${
        process.env.NEXT_PUBLIC_SITE_URL
      }/api/characters/${id}?${params.toString()}`,
      {
        method: "GET",
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

export const postCharacter = async (data: IPostCharacter) => {
  return new Promise<ICharacter>((resolve, reject) => {
    fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/characters`, {
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

        revalidatePath(`/characters`);
        resolve(data);
      })
      .catch(reject);
  });
};

export const putCharacter = async (id: string, data: IPostCharacter) => {
  return new Promise<ICharacter>((resolve, reject) => {
    fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/characters/${id}`, {
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

        revalidatePath(`/characters`);
        revalidatePath(`/characters/${id}`);
        resolve(data);
      })
      .catch(reject);
  });
};

export const deleteCharacter = async (id: string) => {
  return new Promise<ICharacter>((resolve, reject) => {
    fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/characters/${id}`, {
      method: "DELETE",
    })
      .then(async (response) => {
        const data = await response.json().catch(reject);

        if (!response.ok)
          throw new Error(data.error || "An unexpected error occurred");

        revalidatePath(`/characters`);
        revalidatePath(`/characters/${id}`);
        resolve(data);
      })
      .catch(reject);
  });
};
