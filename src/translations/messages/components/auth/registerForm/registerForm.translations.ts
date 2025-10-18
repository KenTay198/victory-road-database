import type { IToastTranslations } from "@translations/messages/messages.translations";

interface IRegisterFormTranslations {
  fields: {
    username: {
      label: string;
    };
    email: {
      label: string;
    };
    password: {
      label: string;
    };
    confirmPassword: {
      label: string;
    };
  };
  toasts: IToastTranslations;
  errors: {
    passwordsMismatch: string;
    usernameMinLength: string;
    usernameMaxLength: string;
    passwordMinLength: string;
    passwordMaxLength: string;
    userAlreadyExists: string;
    emailAlreadyExists: string;
    usernameAlreadyExists: string;
  };
  alreadyRegistered: string;
}

export default IRegisterFormTranslations;
