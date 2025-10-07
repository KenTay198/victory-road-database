export default class ErrorHelper {
  type: string;
  messageKey: string;
  data?: ErrorData;

  constructor(type: string, messageKey: string, data?: ErrorData) {
    this.type = type;
    this.messageKey = messageKey;
    this.data = data;
  }

  static parse(errorString: Error): ErrorHelper {
    const error = new ErrorHelper("UNEXPECTED", `errors.common.categories.UNEXPECTED`);
    try {
      const errorObject = JSON.parse(errorString.message);

      if (errorObject.category) {
        error.type = errorObject.category;
        error.messageKey = `errors.common.categories.${errorObject.category}`;
        if (errorObject.details) {
          error.data = error.formatData(errorObject.category, errorObject.details);
        }
      }
    } catch {}
    return error;
  }

  private formatData(category: string, data: string): ErrorData {
    try {
      data = JSON.parse(data);
    } catch {}

    console.log("data", data);

    switch (category) {
      case "VALIDATION":
        return this.formatValidationErrorData(data);
      case "BUSINESS":
        if (typeof data === "string") return { explanation: data };
        break;
      default:
        break;
    }

    if (typeof data === "string") return { error: data };
    return data;
  }

  private formatValidationErrorData(data: any): ValidationErrorData {
    const fields: { field: string; message: string }[] = [];

    if (Array.isArray(data)) {
      for (const { path, message } of data) {
        fields.push({ field: path[0], message });
      }
    }
    return { fields };
  }

  isValidationError(): this is ErrorHelper & { data: ValidationErrorData } {
    return this.type === "VALIDATION" && this.data !== undefined;
  }

  isBusinessError(): this is ErrorHelper & { data: BusinessErrorData } {
    return this.type === "BUSINESS" && this.data !== undefined;
  }
}

type ErrorData = DefaultErrorData | ValidationErrorData | BusinessErrorData;

type DefaultErrorData = {
  error: string;
};

type ValidationErrorData = {
  fields: { field: string; message: string }[];
};

type BusinessErrorData = {
  explanation: string;
};
