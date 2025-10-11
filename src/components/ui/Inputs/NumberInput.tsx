import type React from "react";
import InputWrapper, { type BaseInputProps } from "./InputWrapper";
import { getInputClasses } from "./utils";

interface TextInputProps extends BaseInputProps {
  value: number | string;
  placeholder?: string;
  type?: "text" | "email" | "password" | "tel" | "url";
  handleChange: (value: number) => void;
  autoComplete?: React.InputHTMLAttributes<HTMLInputElement>["autoComplete"];
  min?: number;
  step?: number;
  max?: number;
}

export default function NumberInput({
  id,
  label,
  description,
  error,
  required = false,
  disabled = false,
  className = "",
  divClassName = "",
  handleChange,
  ...props
}: TextInputProps) {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(parseFloat(event.target.value));
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
      <input
        {...props}
        id={id}
        type="number"
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={getInputClasses(className, !!error, disabled)}
      />
    </InputWrapper>
  );
}
