"use server";
import { ICharacter, IPostCharacter } from "@/types/character.types";
import { revalidatePath } from "next/cache";

export const getCharacters = async () => {
  return new Promise<ICharacter[]>((resolve, reject) => {
    fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/characters`, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then(reject);
        }

        response.json().then(resolve).catch(reject);
      })
      .catch(reject);
  });
};

export const getCharacterById = async (id: string) => {
  return new Promise<ICharacter>((resolve, reject) => {
    fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/characters/${id}`, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then(reject);
        }

        response.json().then(resolve).catch(reject);
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
      .then((response) => {
        if (!response.ok) {
          return response.json().then(reject);
        }

        revalidatePath(`/characters`);

        response.json().then(resolve).catch(reject);
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
      .then((response) => {
        if (!response.ok) {
          return response.json().then(reject);
        }
        revalidatePath(`/characters`);
        revalidatePath(`/characters/${id}`);
        response.json().then(resolve).catch(reject);
      })
      .catch(reject);
  });
};

export const deleteCharacter = async (id: string) => {
  return new Promise<ICharacter>((resolve, reject) => {
    fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/characters/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then(reject);
        }
        revalidatePath(`/characters`);
        revalidatePath(`/characters/${id}`);
        response.json().then(resolve).catch(reject);
      })
      .catch(reject);
  });
};
