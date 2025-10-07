import type IErrorsTranslations from "./errors.translations";

const errorsFr: IErrorsTranslations = {
  common: {
    categories: {
      UNEXPECTED: "Une erreur inattendue s'est produite. Veuillez patienter avant de réessayer.",
      VALIDATION: "Il y a des erreurs de validation. Veuillez vérifier les champs du formulaire.",
    },
    required: "Ce champ est requis",
    requiredField: 'Le champ "{field}" est requis.',
    invalidEmail: "Veuillez entrer une adresse e-mail valide",
  },
  components: {
    forms: {
      register: {
        passwordsMismatch: "Les mots de passe ne correspondent pas",
        usernameMinLength: "Le nom d'utilisateur doit contenir au moins 4 caractères",
        usernameMaxLength: "Le nom d'utilisateur ne peut pas dépasser 30 caractères",
        passwordMinLength: "Le mot de passe doit contenir au moins 8 caractères",
        passwordMaxLength: "Le mot de passe ne peut pas dépasser 100 caractères",
        userAlreadyExists: "Un utilisateur avec cet e-mail ou nom d'utilisateur existe déjà",
      },
    },
  },
};

export default errorsFr;
