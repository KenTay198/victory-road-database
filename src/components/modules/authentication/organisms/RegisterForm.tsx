"use client";
import { register } from "@/controllers/users.controller";
import Button from "@atoms/Button";
import PasswordInput from "@atoms/Inputs/PasswordInput";
import TextInput from "@atoms/Inputs/TextInput";
import { useLoadingState } from "@context/LoadingContext";
import { isValidPassword } from "@utils/functions";
import React, { useState } from "react";
import { toast } from "sonner";

interface IFormData {
  email: string;
  username: string;
  password: string;
  passwordConfirm: string;
}

function RegisterForm() {
  const [formData, setFormData] = useState<Partial<IFormData>>({});
  const [errors, setErrors] = useState<string[]>([]);
  const { setIsLoading } = useLoadingState();

  const checkErrors = () => {
    const errors: string[] = [];
    const { email, password, passwordConfirm, username } = formData;  

    if (!email) errors.push("email");
    if (!username) errors.push("username");
    if (!password || !isValidPassword(password)) errors.push("password");
    if (!passwordConfirm || passwordConfirm !== password)
      errors.push("passwordConfirm");

    return errors;
  };

  const handleSubmit = () => {
    const errors = checkErrors();
    if (errors.length > 0) return setErrors(errors);
    setErrors([]);
    const { username, email, password } = formData as IFormData;
    setIsLoading(true);
    register({ username, email, password })
      .then(() => toast.success("You have been registered."))
      .catch((err) => {
        console.log(err);
        toast.error("An error has occurred while registering");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="flex flex-col gap-2">
      <TextInput
        id="email"
        type="email"
        label="Email"
        value={formData.email || ""}
        handleChange={(email) => setFormData({ ...formData, email })}
        error={errors.includes("email")}
      />
      <TextInput
        id="username"
        label="Username"
        value={formData.username || ""}
        handleChange={(username) => setFormData({ ...formData, username })}
        error={errors.includes("username")}
      />
      <PasswordInput
        id="password"
        label="Password"
        value={formData.password || ""}
        complexPassword
        handleChange={(password) => setFormData({ ...formData, password })}
        error={errors.includes("password")}
      />
      <PasswordInput
        id="passwordConfirm"
        label="Confirm password"
        value={formData.passwordConfirm || ""}
        handleChange={(passwordConfirm) =>
          setFormData({ ...formData, passwordConfirm })
        }
        error={errors.includes("passwordConfirm")}
      />
      <Button color="yellow" className="text-xl" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
}

export default RegisterForm;
