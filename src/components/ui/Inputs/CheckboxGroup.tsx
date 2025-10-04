import type React from "react";
import InputWrapper, { type BaseInputProps } from "./InputWrapper";
import Checkbox from "./Checkbox";

export interface CheckboxGroupOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface CheckboxGroupProps extends BaseInputProps {
  values: string[];
  options: CheckboxGroupOption[];
  handleChange: (values: string[]) => void;
}

export default function CheckboxGroup({
  id,
  label,
  description,
  error,
  required = false,
  disabled = false,
  className = "",
  values,
  options,
  handleChange,
}: CheckboxGroupProps) {
  const handleCheckboxChange = (optionValue: string, checked: boolean) => {
    let newValues: string[];

    if (checked) {
      // Add the value if it's not already in the array
      newValues = values.includes(optionValue) ? values : [...values, optionValue];
    } else {
      // Remove the value from the array
      newValues = values.filter((value) => value !== optionValue);
    }

    handleChange(newValues);
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
      <div className="space-y-2">
        {options.map((option) => (
          <div key={option.value} className="flex items-center">
            <Checkbox
              id={`${id}-${option.value}`}
              checked={values.includes(option.value)}
              disabled={disabled || option.disabled}
              handleChange={(checked) => handleCheckboxChange(option.value, checked)}
              className="mr-2"
            />
            <label
              htmlFor={`${id}-${option.value}`}
              className={`text-sm ${disabled || option.disabled ? "text-gray-400 cursor-not-allowed" : "text-gray-700 cursor-pointer"}`}
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </InputWrapper>
  );
}
