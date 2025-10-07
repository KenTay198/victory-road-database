import type IUserTranslations from "./user.translations";

const userFr: IUserTranslations = {
  forms: {
    register: {
      toasts: {
        success: "Inscription réussie !",
        error: "Échec de l'inscription. Veuillez réessayer.",
        loading: "Inscription en cours...",
      },
    },
  },
};

export default userFr;
