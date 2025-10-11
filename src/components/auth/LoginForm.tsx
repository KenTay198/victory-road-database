"use client";
import React, { useState } from "react";
import TextInput from "@components/ui/Inputs/TextInput";
import type { ILoginData } from "@user/user.types";
import { useTranslations } from "use-intl";
import Button from "@components/ui/Buttons/Button";
import type { FormError } from "@utils/types";
import { useAuth } from "@context/AuthContext";
import { toast } from "sonner";
import ErrorHelpers from "@utils/helpers/error.helpers";
import PasswordInput from "@components/ui/Inputs/PasswordInput";
import { useRouter } from "next/navigation";
import Link from "next/link";

const RegisterForm = ({ className, ...props }: React.HTMLAttributes<HTMLFormElement>) => {
  const t = useTranslations();
  const { login } = useAuth();
  const router = useRouter();
  const [data, setData] = useState<Partial<ILoginData>>({});
  const [errors, setErrors] = useState<FormError[]>([]);

  const handleChange = (field: keyof ILoginData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const checkErrors = (data: Partial<ILoginData>): data is ILoginData => {
    const errors: FormError[] = [];
    if (!data.identifier) {
      errors.push({ field: "identifier", message: t("errors.common.required") });
    }
    if (!data.password) {
      errors.push({ field: "password", message: t("errors.common.required") });
    }
    setErrors(errors);
    return errors.length === 0;
  };

  const handleSubmit = () => {
    if (checkErrors(data)) {
      toast.promise(login(data as ILoginData), {
        success: () => {
          router.push("/");
          return t("components.auth.loginForm.toasts.success");
        },
        error: (e) => {
          const error = ErrorHelpers.parse(e);
          const explanation = error.messageKey || "components.auth.loginForm.toasts.error";
          if (error.hasFields()) {
            setErrors(error.data.fields.map(({ field, message }) => ({ field, message: t(message) })));
          }

          return t(explanation);
        },
        loading: t("components.auth.loginForm.toasts.loading"),
      });
    }
  };

  return (
    <form {...props} className={["space-y-4", className].join(" ")}>
      <TextInput
        id="identifier"
        label={t("components.auth.loginForm.fields.identifier.label")}
        placeholder={t("components.auth.loginForm.fields.identifier.placeholder")}
        value={data.identifier || ""}
        handleChange={(value) => handleChange("identifier", value)}
        error={errors.find((e) => e.field === "identifier")?.message}
        autoComplete="username"
      />
      <PasswordInput
        id="password"
        label={t("components.auth.loginForm.fields.password.label")}
        placeholder={t("components.auth.loginForm.fields.password.placeholder")}
        value={data.password || ""}
        handleChange={(value) => handleChange("password", value)}
        error={errors.find((e) => e.field === "password")?.message}
        autoComplete="current-password"
      />
      <Button className="mx-auto flex" template="blue" onClick={handleSubmit}>
        {t("common.buttons.submit")}
      </Button>
      <Link href="/register" className="block text-center italic underline">
        {t("components.auth.loginForm.notRegisteredYet")}
      </Link>
    </form>
  );
};

export default RegisterForm;
