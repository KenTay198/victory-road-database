interface ILoginFormTranslations {
  fields: {
    identifier: {
      label: string;
      placeholder: string;
    };
    password: {
      label: string;
      placeholder: string;
    };
  };
  toasts: {
    success: string;
    error: string;
    loading: string;
  };
  errors: {
    invalidCredentials: string;
  };
  notRegisteredYet: string;
}

export default ILoginFormTranslations;
