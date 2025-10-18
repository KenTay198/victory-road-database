import type { IToastTranslations } from "@translations/messages/messages.translations";

interface ILoginFormTranslations {
  fields: {
    identifier: {
      label: string;
      placeholder: string;
    };
    password: {
      label: string;
      placeholder: string;
    };
  };
  toasts: IToastTranslations;
  errors: {
    invalidCredentials: string;
  };
  notRegisteredYet: string;
}

export default ILoginFormTranslations;
