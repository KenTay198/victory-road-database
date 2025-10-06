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
  checkboxGap?: number;
}

export default function CheckboxGroup({
  id,
  label,
  description,
  error,
  required = false,
  disabled = false,
  className = "",
  divClassName = "",
  values,
  options,
  checkboxGap,
  handleChange,
}: CheckboxGroupProps) {
  const handleCheckboxChange = (optionValue: string, checked: boolean) => {
    let newValues: string[];
    if (checked) {
      newValues = values.includes(optionValue) ? values : [...values, optionValue];
    } else {
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
      className={divClassName}
    >
      <div className={className}>
        {options.map((option) => (
          <Checkbox
            key={option.value}
            id={`${id}-${option.value}`}
            checked={values.includes(option.value)}
            disabled={disabled || option.disabled}
            label={option.label}
            handleChange={(checked) => handleCheckboxChange(option.value, checked)}
            gap={checkboxGap}
          />
        ))}
      </div>
    </InputWrapper>
  );
}
