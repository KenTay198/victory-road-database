import React from "react";
import { IBaseProps } from "./types";
import InputWrapper from "./InputWrapper";
import RadioInput from "./RadioInput";

interface IProps
  extends IBaseProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  id: string;
  options: { value: string; label: string }[];
  handleChange: (val: string) => void;
}

function RadioGroup({
  options,
  labelClassName,
  divClassName,
  label,
  error,
  errorMessage,
  handleChange,
  ...props
}: IProps) {
  const wrapperProps = {
    labelClassName,
    divClassName,
    error,
    label,
    id: props.id,
    required: props.required,
    errorMessage,
  };

  return (
    <InputWrapper {...wrapperProps}>
      <div className="flex flex-wrap gap-3 items-center">
        {options.map(({ value, label }) => {
          const key = `${props.id}-${value}`;
          return (
            <RadioInput
              id={key}
              key={key}
              type="radio"
              checked={value === props.value}
              onChange={() => handleChange(value)}
              label={label}
            />
          );
        })}
      </div>
    </InputWrapper>
  );
}

export default RadioGroup;
