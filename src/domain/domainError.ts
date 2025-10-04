export default class DomainError extends Error {
  constructor(
    public ErrorCategory: ErrorCategory,
    public errorCode: ErrorCode,
    public error: any,
  ) {
    super(`Error [${ErrorCategory}]: ${errorCode}`);
  }

  static handleError(error: any): string {
    console.error(error);
    if (error instanceof DomainError) {
      return error.ErrorCategory;
    }
    return new DomainError("UNEXPECTED", "UNKNOWN", error).ErrorCategory;
  }
}

export type ErrorCategory = "UNEXPECTED" | "VALIDATION";

export type ErrorCode = "DATABASE_CONNECTION_FAILED" | "UNKNOWN";
