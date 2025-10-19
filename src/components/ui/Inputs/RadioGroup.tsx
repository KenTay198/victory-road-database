import type React from "react";
import InputWrapper, { type BaseInputProps } from "./InputWrapper";

export interface RadioGroupOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface RadioGroupProps extends BaseInputProps {
  value: string;
  options: RadioGroupOption[];
  handleChange: (value: string) => void;
}

export default function RadioGroup({
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
  handleChange,
}: RadioGroupProps) {
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
      <div className={className}>
        {options.map((option) => (
          <div key={option.value} className="flex items-center">
            <input
              type="radio"
              id={`${id}-${option.value}`}
              name={id}
              value={option.value}
              checked={value === option.value}
              onChange={handleRadioChange}
              disabled={disabled || option.disabled}
              required={required}
              className={`w-4 h-4 text-raimon-blue bg-gray-100 border-gray-300 focus:ring-raimon-blue focus:ring-2 ${disabled || option.disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"} ${error ? "border-red-500" : ""}`}
            />
            <label
              htmlFor={`${id}-${option.value}`}
              className={`ml-2 text-sm ${disabled || option.disabled ? "text-gray-400 cursor-not-allowed" : "cursor-pointer"}`}
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </InputWrapper>
  );
}
