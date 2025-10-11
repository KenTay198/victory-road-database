import { ZodError } from "zod";

export default class DomainError extends Error {
  constructor(
    public category: ErrorCategory,
    public code: ErrorCode,
    public details?: any,
  ) {
    super(`Error [${category}]: ${code}`);
  }

  static handleError(details: any): string {
    let error = DomainError.tryParse(details);
    if (!DomainError.isDomainError(error)) {
      let category: ErrorCategory = "UNEXPECTED";
      let code: ErrorCode = "UNKNOWN";
      if (error instanceof ZodError) {
        category = "VALIDATION";
        code = "VALIDATION_FAILED";
        details = details.toString();
      } else if (error instanceof Error) {
        details = error.message;
      } else {
        details = null;
      }
      error = new DomainError(category, code, details);
    }

    return error.toJSON();
  }

  static isDomainError(error: any): error is DomainError {
    return error instanceof DomainError || ["category", "code"].every((key) => Object.keys(error).includes(key));
  }

  toJSON(): string {
    return JSON.stringify({
      category: this.category,
      code: this.code,
      details: this.details,
    });
  }

  static tryParse(error: any): DomainError | any {
    try {
      const json = JSON.parse(error);
      if (DomainError.isDomainError(json)) {
        return new DomainError(json.category, json.code, json.details);
      }
      return json;
    } catch {
      return error;
    }
  }
}

export type ErrorCategory = "UNEXPECTED" | "VALIDATION" | "BUSINESS";

export type ErrorCode =
  | "DATABASE_CONNECTION_FAILED"
  | "VALIDATION_FAILED"
  | "DUPLICATE_ENTRY"
  | "INVALID_CREDENTIALS"
  | "UNKNOWN";
