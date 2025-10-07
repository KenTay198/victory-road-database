interface IErrorsTranslations {
  common: {
    categories: {
      UNEXPECTED: string;
      VALIDATION: string;
    };
    required: string;
    requiredField: string;
    invalidEmail: string;
  };
  components: {
    forms: {
      register: {
        passwordsMismatch: string;
        usernameMinLength: string;
        usernameMaxLength: string;
        passwordMinLength: string;
        passwordMaxLength: string;
        userAlreadyExists: string;
      };
    };
  };
}

export default IErrorsTranslations;
