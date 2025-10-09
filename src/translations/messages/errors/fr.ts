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
};

export default errorsFr;
