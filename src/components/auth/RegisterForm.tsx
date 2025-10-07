"use client";
import React, { useState } from "react";
import TextInput from "@components/ui/Inputs/TextInput";
import type { ICreateUserData } from "@user/user.types";
import { useTranslations } from "use-intl";
import Button from "@components/ui/Buttons/Button";
import type { FormError } from "@utils/types";
import { useAuth } from "@context/AuthContext";
import { toast } from "sonner";
import ObjectHelpers from "@utils/helpers/object.helpers";
import ErrorHelpers from "@utils/helpers/error.helpers";
import PasswordInput from "@components/ui/Inputs/PasswordInput";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  /* Props go here */
}

interface IFormData extends Partial<ICreateUserData> {
  confirmPassword?: string;
}

const RegisterForm = ({ className, ...props }: IProps) => {
  const t = useTranslations();
  const { register } = useAuth();
  const [data, setData] = useState<IFormData>({
    username: "john",
    email: "john@example.com",
    password: "password",
    confirmPassword: "password",
  });
  const [errors, setErrors] = useState<FormError[]>([]);

  const handleChange = (field: keyof IFormData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const checkErrors = (data: IFormData) => {
    const errors: FormError[] = [];
    if (!data.username) {
      errors.push({ field: "username", message: t("errors.common.required") });
    }
    if (!data.email) {
      errors.push({ field: "email", message: t("errors.common.required") });
    }
    if (!data.password) {
      errors.push({ field: "password", message: t("errors.common.required") });
    }
    if (data.password !== data.confirmPassword) {
      errors.push({ field: "password", message: t("errors.components.forms.register.passwordsMismatch") });
      errors.push({ field: "confirmPassword", message: t("errors.components.forms.register.passwordsMismatch") });
    }

    setErrors(errors);
    return errors.length > 0;
  };

  const handleSubmit = () => {
    if (checkErrors(data)) {
      return;
    }

    const dataToSubmit = ObjectHelpers.removeProperty<Required<IFormData>>(data, "confirmPassword");
    toast.promise(register(dataToSubmit), {
      success: () => {
        return t("user.forms.register.toasts.success");
      },
      error: (e) => {
        const error = ErrorHelpers.parse(e);
        if (error.isValidationError()) {
          setErrors(error.data.fields.map(({ field, message }) => ({ field, message: t(message) })));
        } else if (error.isBusinessError()) {
          return t(error.data.explanation);
        }
        return t(error.messageKey || "user.forms.register.toasts.error");
      },
      loading: t("user.forms.register.toasts.loading"),
    });
  };

  return (
    <div {...props} className={["space-y-4", className].join(" ")}>
      <TextInput
        id="username"
        label={t("components.auth.registerForm.fields.username.label")}
        value={data.username || ""}
        handleChange={(value) => handleChange("username", value)}
        error={errors.find((e) => e.field === "username")?.message}
        autoComplete="username"
      />
      <TextInput
        id="email"
        label={t("components.auth.registerForm.fields.email.label")}
        value={data.email || ""}
        handleChange={(value) => handleChange("email", value)}
        error={errors.find((e) => e.field === "email")?.message}
        autoComplete="email"
      />
      <PasswordInput
        id="password"
        label={t("components.auth.registerForm.fields.password.label")}
        value={data.password || ""}
        handleChange={(value) => handleChange("password", value)}
        error={errors.find((e) => e.field === "password")?.message}
        autoComplete="new-password"
      />
      <PasswordInput
        id="confirmPassword"
        label={t("components.auth.registerForm.fields.confirmPassword.label")}
        value={data.confirmPassword || ""}
        handleChange={(value) => handleChange("confirmPassword", value)}
        error={errors.find((e) => e.field === "confirmPassword")?.message}
        autoComplete="new-password"
      />
      <Button className="mx-auto flex" template="blue" onClick={handleSubmit}>
        {t("common.buttons.submit")}
      </Button>
    </div>
  );
};

export default RegisterForm;
