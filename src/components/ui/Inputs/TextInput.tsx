import type React from "react";
import InputWrapper, { type BaseInputProps } from "./InputWrapper";
import { getInputClasses } from "./utils";

interface TextInputProps extends BaseInputProps {
  value: string;
  placeholder?: string;
  type?: "text" | "email" | "password" | "tel" | "url";
  handleChange: (value: string) => void;
  autoComplete?: React.InputHTMLAttributes<HTMLInputElement>["autoComplete"];
}

export default function TextInput({
  id,
  label,
  description,
  error,
  required = false,
  disabled = false,
  className = "",
  value,
  placeholder,
  type = "text",
  handleChange,
  autoComplete,
}: TextInputProps) {
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
      className={className}
    >
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        placeholder={placeholder}
        className={getInputClasses(className, !!error, disabled)}
        autoComplete={autoComplete}
      />
    </InputWrapper>
  );
}
