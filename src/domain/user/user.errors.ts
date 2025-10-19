import DomainError, { type ErrorCategory, type ErrorCode } from "@domain/shared/domainError/domainError";

const UserErrors = {
  getError(error: UserError, details: any = {}): DomainError {
    let category: ErrorCategory = "UNEXPECTED";
    let code: ErrorCode = "UNKNOWN";

    if (error === "USER_ALREADY_EXISTS") {
      category = "BUSINESS";
      code = "DUPLICATE_ENTRY";
    }

    return new DomainError(category, code, { explanation: UserErrors[error], ...details });
  },

  USER_ALREADY_EXISTS: "components.auth.registerForm.userAlreadyExists",
};

type UserError = "USER_ALREADY_EXISTS";

export default UserErrors;
