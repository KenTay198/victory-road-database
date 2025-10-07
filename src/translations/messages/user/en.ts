import type IUserTranslations from "./user.translations";

const userEn: IUserTranslations = {
  forms: {
    register: {
      toasts: {
        success: "Registration successful!",
        error: "Registration failed. Please try again.",
        loading: "Registering...",
      },
    },
  },
};

export default userEn;
