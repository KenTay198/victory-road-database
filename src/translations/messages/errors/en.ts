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
  components: {
    forms: {
      register: {
        passwordsMismatch: "Passwords do not match",
        usernameMinLength: "Username must be at least 4 characters long",
        usernameMaxLength: "Username must not exceed 30 characters",
        passwordMinLength: "Password must be at least 8 characters long",
        passwordMaxLength: "Password must not exceed 100 characters",
        userAlreadyExists: "A user with this email or username already exists",
      },
    },
  },
};

export default errorsEn;
