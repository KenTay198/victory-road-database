"use client";
import React, { useState } from "react";
import TextInput from "@components/ui/Inputs/TextInput";
import type { ICreateUserData } from "@user/user.types";
import { useTranslations } from "use-intl";
import Button from "@components/ui/Buttons/Button";
import type { FormError } from "@utils/types";
import { useAuth } from "@context/AuthContext";
import { toast } from "sonner";
import ErrorHelpers from "@utils/helpers/error.helpers";
import PasswordInput from "@components/ui/Inputs/PasswordInput";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface IFormData extends Partial<ICreateUserData> {
  confirmPassword?: string;
}

const RegisterForm = ({ className, ...props }: React.HTMLAttributes<HTMLFormElement>) => {
  const t = useTranslations();
  const { register } = useAuth();
  const router = useRouter();
  const [data, setData] = useState<IFormData>({});
  const [errors, setErrors] = useState<FormError[]>([]);

  const handleChange = (field: keyof IFormData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const checkErrors = (data: IFormData): data is Required<ICreateUserData> => {
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
      errors.push({ field: "password", message: t("components.authregisterForm.errors.passwordsMismatch") });
      errors.push({ field: "confirmPassword", message: t("components.authregisterForm.errors.passwordsMismatch") });
    }

    setErrors(errors);
    return errors.length === 0;
  };

  const handleSubmit = () => {
    const sendData = { ...data };
    if (checkErrors(sendData)) {
      if ("confirmPassword" in sendData) delete sendData.confirmPassword;
      toast.promise(register(sendData), {
        success: () => {
          router.push("/login");
          return t("components.auth.registerForm.toasts.success");
        },
        error: (e) => {
          const error = ErrorHelpers.parse(e);
          const explanation = error.messageKey || "components.auth.registerForm.toasts.error";
          if (error.hasFields()) {
            setErrors(error.data.fields.map(({ field, message }) => ({ field, message: t(message) })));
          }
          return t(explanation);
        },
        loading: t("components.auth.registerForm.toasts.loading"),
      });
    }
  };

  return (
    <form {...props} className={["space-y-4", className].join(" ")}>
      <TextInput
        id="username"
        label={t("components.auth.registerForm.fields.username.label")}
        value={data.username || ""}
        handleChange={(value) => handleChange("username", value)}
        error={errors.find((e) => e.field === "username")?.message}
        autoComplete="username"
        required
      />
      <TextInput
        id="email"
        label={t("components.auth.registerForm.fields.email.label")}
        value={data.email || ""}
        handleChange={(value) => handleChange("email", value)}
        error={errors.find((e) => e.field === "email")?.message}
        autoComplete="email"
        required
      />
      <PasswordInput
        id="password"
        label={t("components.auth.registerForm.fields.password.label")}
        value={data.password || ""}
        handleChange={(value) => handleChange("password", value)}
        error={errors.find((e) => e.field === "password")?.message}
        autoComplete="new-password"
        required
      />
      <PasswordInput
        id="confirmPassword"
        label={t("components.auth.registerForm.fields.confirmPassword.label")}
        value={data.confirmPassword || ""}
        handleChange={(value) => handleChange("confirmPassword", value)}
        error={errors.find((e) => e.field === "confirmPassword")?.message}
        autoComplete="new-password"
        required
      />
      <Button className="mx-auto flex" template="blue" onClick={handleSubmit}>
        {t("common.buttons.submit")}
      </Button>
      <Link href="/login" className="block text-center italic underline">
        {t("components.auth.registerForm.alreadyRegistered")}
      </Link>
    </form>
  );
};

export default RegisterForm;
