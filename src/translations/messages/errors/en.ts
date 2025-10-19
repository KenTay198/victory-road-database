import type IErrorsTranslations from "./errors.translations";

const errorsEn: IErrorsTranslations = {
  common: {
    categories: {
      UNEXPECTED: "An unexpected error occurred. Please try again later.",
      VALIDATION: "There are validation errors. Please check the form fields.",
    },
    required: "This field is required",
    requiredField: 'The field "{field}" is required.',
    invalidEmail: "Please enter a valid email address",
  },
};

export default errorsEn;
