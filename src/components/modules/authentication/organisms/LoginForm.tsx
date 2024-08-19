"use client";
import { isAuth, login } from "@/controllers/users.controller";
import Button from "@atoms/Button";
import PasswordInput from "@atoms/Inputs/PasswordInput";
import TextInput from "@atoms/Inputs/TextInput";
import { useLoadingState } from "@context/LoadingContext";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

interface IFormData {
  identifier: string;
  password: string;
}

function LoginForm() {
  const [formData, setFormData] = useState<Partial<IFormData>>({});
  const [errors, setErrors] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const { setIsLoading } = useLoadingState();

  const checkErrors = () => {
    const errors: string[] = [];
    const { password, identifier } = formData;

    if (!identifier) errors.push("identifier");
    if (!password) errors.push("password");

    return errors;
  };

  const handleSubmit = () => {
    const errors = checkErrors();
    if (errors.length > 0) return setErrors(errors);
    setErrors([]);
    setErrorMessage("");
    const { identifier, password } = formData as IFormData;
    setIsLoading(true);
    login({ identifier, password })
      .then(() => {
        toast.success("Login successful.");
        isAuth().then(() => router.push("/dashboard"));
      })
      .catch((err) => {
        setErrorMessage(err.message);
        toast.error("An error has occurred while signing in");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="flex flex-col gap-2">
      <TextInput
        id="identifier"
        type="identifier"
        label="Email or username"
        value={formData.identifier || ""}
        handleChange={(identifier) => setFormData({ ...formData, identifier })}
        error={errors.includes("identifier")}
      />
      <PasswordInput
        id="password"
        label="Password"
        value={formData.password || ""}
        handleChange={(password) => setFormData({ ...formData, password })}
        error={errors.includes("password")}
      />
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <Button color="yellow" className="text-xl" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
}

export default LoginForm;
