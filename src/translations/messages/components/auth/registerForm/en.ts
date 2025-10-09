import type IRegisterFormTranslations from "./registerForm.translations";

const registerFormEn: IRegisterFormTranslations = {
  fields: {
    username: {
      label: "Username",
    },
    email: {
      label: "Email",
    },
    password: {
      label: "Password",
    },
    confirmPassword: {
      label: "Confirm password",
    },
  },
  toasts: {
    success: "Registration successful!",
    error: "Registration failed. Please try again.",
    loading: "Registering...",
  },
  errors: {
    passwordsMismatch: "Passwords do not match",
    usernameMinLength: "Username must be at least 4 characters long",
    usernameMaxLength: "Username must not exceed 30 characters",
    passwordMinLength: "Password must be at least 8 characters long",
    passwordMaxLength: "Password must not exceed 100 characters",
    userAlreadyExists: "A user with this email or username already exists",
    emailAlreadyExists: "A user with this email already exists",
    usernameAlreadyExists: "A user with this username already exists",
  },
  alreadyRegistered: "Already registered? Log in here.",
};

export default registerFormEn;
