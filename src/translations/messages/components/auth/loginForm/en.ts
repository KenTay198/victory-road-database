import type ILoginFormTranslations from "./loginForm.translations";

const loginFormEn: ILoginFormTranslations = {
  fields: {
    identifier: {
      label: "Identifier",
      placeholder: "Username or Email",
    },
    password: {
      label: "Password",
      placeholder: "Enter your password",
    },
  },
  toasts: {
    success: "Login successful!",
    error: "Login failed. Please try again.",
    loading: "Logging in...",
  },
  errors: {
    invalidCredentials: "Invalid credentials. Please check your username and password.",
  },
  notRegisteredYet: "Not registered yet? Click here to sign up!",
};

export default loginFormEn;
