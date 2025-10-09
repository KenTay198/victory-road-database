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

    switch (category) {
      case "VALIDATION":
        return this.formatValidationErrorData(data);
      case "BUSINESS":
        return this.formatBusinessErrorData(data);
      default:
        break;
    }

    if (typeof data === "string") return { error: data };
    return data;
  }

  private formatValidationErrorData(data: any): FieldsErrorData {
    const fields: { field: string; message: string }[] = [];

    if (Array.isArray(data)) {
      for (const { path, message } of data) {
        fields.push({ field: path[0], message });
      }
    }
    return { fields };
  }

  private formatBusinessErrorData(data: any): DefaultErrorData | FieldsErrorData {
    if (typeof data === "string") {
      this.messageKey = data;
      data = { error: data };
    } else if (data.explanation && typeof data.explanation === "string") {
      this.messageKey = data.explanation;
    }
    return data;
  }

  hasFields(): this is ErrorHelper & { data: FieldsErrorData } {
    return (
      this.data !== undefined && "fields" in this.data && Array.isArray(this.data.fields) && this.data.fields.length > 0
    );
  }

  isValidationError(): this is ErrorHelper & { data: FieldsErrorData } {
    return this.type === "VALIDATION" && this.data !== undefined;
  }

  isBusinessError(): this is ErrorHelper & { data: FieldsErrorData } {
    return this.type === "BUSINESS" && this.data !== undefined;
  }
}

type ErrorData = DefaultErrorData | FieldsErrorData;

type DefaultErrorData = {
  error: string;
};

type FieldsErrorData = {
  fields: FieldMessage[];
};

type FieldMessage = { field: string; message: string };
