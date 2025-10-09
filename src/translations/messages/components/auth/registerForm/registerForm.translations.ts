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
  toasts: {
    success: string;
    error: string;
    loading: string;
  };
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
