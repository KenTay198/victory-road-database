import { passwordSpecialChars } from "./variables";
import { IPasswordRequirements } from "@/types/types";

export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const normalize = (str: string) =>
  str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

export const isValidUrl = (url: string): boolean => {
  const regex =
    /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
  return regex.test(url);
};

export const isValidEmail = (email: string): boolean => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};

export const getPasswordRequirements = (
  password: string
): Required<IPasswordRequirements> => {
  const requirements: IPasswordRequirements = {};
  requirements.length = password.length >= 8;
  requirements.upperLetter = /[A-Z]/.test(password);
  requirements.lowerLetter = /[a-z]/.test(password);
  requirements.number = /\d/.test(password);
  requirements.specialChar = new RegExp(`[${passwordSpecialChars}]`).test(
    password
  );

  return requirements as Required<IPasswordRequirements>;
};

export const isValidPassword = (password: string): boolean => {
  const requirements = getPasswordRequirements(password);
  return !Object.values(requirements).some((e) => !e);
};