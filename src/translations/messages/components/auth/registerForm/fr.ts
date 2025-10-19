import type IRegisterFormTranslations from "./registerForm.translations";

const registerFormFr: IRegisterFormTranslations = {
  fields: {
    username: {
      label: "Nom d'utilisateur",
    },
    email: {
      label: "Email",
    },
    password: {
      label: "Mot de passe",
    },
    confirmPassword: {
      label: "Confirmer le mot de passe",
    },
  },
  toasts: {
    success: "Inscription réussie !",
    error: "Échec de l'inscription. Veuillez réessayer.",
    loading: "Inscription en cours...",
  },
  errors: {
    passwordsMismatch: "Les mots de passe ne correspondent pas",
    usernameMinLength: "Le nom d'utilisateur doit contenir au moins 4 caractères",
    usernameMaxLength: "Le nom d'utilisateur ne peut pas dépasser 30 caractères",
    passwordMinLength: "Le mot de passe doit contenir au moins 8 caractères",
    passwordMaxLength: "Le mot de passe ne peut pas dépasser 100 caractères",
    userAlreadyExists: "Un utilisateur avec cet e-mail ou nom d'utilisateur existe déjà",
    emailAlreadyExists: "Un utilisateur avec cet e-mail existe déjà",
    usernameAlreadyExists: "Un utilisateur avec ce nom d'utilisateur existe déjà",
  },
  alreadyRegistered: "Déjà inscrit ? Connectez-vous ici.",
};

export default registerFormFr;
