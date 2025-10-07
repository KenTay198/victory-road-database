import DomainError from "@domain/shared/domainError/domainError";

const UserErrors = {
  getError(error: UserError, details?: any): DomainError {
    if (error === "USER_ALREADY_EXISTS") {
      return new DomainError("BUSINESS", "DUPLICATE_ENTRY", UserErrors.USER_ALREADY_EXISTS);
    }
    return new DomainError("VALIDATION", "UNKNOWN", details || UserErrors[error]);
  },

  USER_ALREADY_EXISTS: "errors.components.forms.register.userAlreadyExists",
};

type UserError = "USER_ALREADY_EXISTS";

export default UserErrors;
