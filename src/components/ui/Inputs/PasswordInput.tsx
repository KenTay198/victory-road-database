import type React from "react";
import InputWrapper, { type BaseInputProps } from "./InputWrapper";
import { getInputClasses } from "./utils";
import { useState } from "react";
import CheckboxInput from "./CheckboxInput";
import { useTranslations } from "next-intl";

interface TextInputProps extends BaseInputProps {
  value: string;
  placeholder?: string;
  type?: "text" | "email" | "password" | "tel" | "url";
  handleChange: (value: string) => void;
  autoComplete?: React.InputHTMLAttributes<HTMLInputElement>["autoComplete"];
}

export default function PasswordInput({
  id,
  label,
  description,
  error,
  required = false,
  disabled = false,
  className = "",
  divClassName = "",
  value,
  placeholder,
  handleChange,
  autoComplete,
}: TextInputProps) {
  const t = useTranslations("components.ui.inputs.password");
  const [showPassword, setShowPassword] = useState(false);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(event.target.value);
  };

  return (
    <InputWrapper
      id={id}
      label={label}
      description={description}
      error={error}
      required={required}
      disabled={disabled}
      className={divClassName}
    >
      <div className="space-y-2">
        <input
          id={id}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          placeholder={placeholder}
          className={getInputClasses(className, !!error, disabled)}
          autoComplete={autoComplete}
        />
        <CheckboxInput
          id={`${id}-toggle`}
          checked={showPassword}
          label={t("showPassword")}
          handleChange={() => setShowPassword(!showPassword)}
          gap={4}
        />
      </div>
    </InputWrapper>
  );
}
