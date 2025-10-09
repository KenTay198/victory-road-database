import type ILoginFormTranslations from "./loginForm.translations";

const loginFormFr: ILoginFormTranslations = {
  fields: {
    identifier: {
      label: "Identifiant",
      placeholder: "Nom d'utilisateur ou Email",
    },
    password: {
      label: "Mot de passe",
      placeholder: "Entrez votre mot de passe",
    },
  },
  toasts: {
    success: "Connexion réussie !",
    error: "Échec de la connexion. Veuillez réessayer.",
    loading: "Connexion en cours...",
  },
  errors: {
    invalidCredentials: "Identifiants invalides. Veuillez vérifier votre nom d'utilisateur et votre mot de passe.",
  },
  notRegisteredYet: "Pas encore inscrit ? Cliquez-ici pour vous inscrire !",
};

export default loginFormFr;
