import type React from "react";
import InputWrapper, { type BaseInputProps } from "./InputWrapper";
import { getInputClasses } from "./utils";

interface TextareaInputProps extends BaseInputProps {
  value: string;
  placeholder?: string;
  handleChange: (value: string) => void;
  minRows?: number;
  maxRows?: number;
}

export default function TextareaInput({
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
}: TextareaInputProps) {
  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
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
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        placeholder={placeholder}
        className={getInputClasses(className, !!error, disabled)}
      />
    </InputWrapper>
  );
}
