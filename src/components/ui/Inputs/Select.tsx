import type React from "react";
import InputWrapper, { type BaseInputProps } from "./InputWrapper";
import { getSelectClasses } from "./utils";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectInputProps extends BaseInputProps {
  value: string;
  options: SelectOption[];
  placeholder?: string;
  handleChange: (value: string) => void;
}

export default function SelectInput({
  id,
  label,
  description,
  error,
  required = false,
  disabled = false,
  className = "",
  divClassName = "",
  value,
  options,
  placeholder = "Select an option...",
  handleChange,
}: SelectInputProps) {
  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
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
      <select
        id={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={getSelectClasses(className, !!error, disabled)}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>
    </InputWrapper>
  );
}
