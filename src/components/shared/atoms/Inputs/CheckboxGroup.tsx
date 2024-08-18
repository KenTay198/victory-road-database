import React from "react";
import { IBaseProps } from "./types";
import InputWrapper from "./InputWrapper";
import CheckboxInput from "./CheckboxInput";

interface IProps
  extends IBaseProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  id: string;
  value: string[];
  options: { value: string; label: string }[];
  handleChange: (val: string[]) => void;
  allOptions?: boolean;
}

function CheckboxGroup({
  options,
  labelClassName,
  divClassName,
  label,
  error,
  errorMessage,
  handleChange,
  allOptions,
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

  const allSelected = !options.some(
    ({ value }) => !props.value.includes(value)
  );

  return (
    <InputWrapper {...wrapperProps}>
      <div className="flex flex-wrap gap-3 items-center">
        {allOptions && (
          <CheckboxInput
            id={`${props.id}-all`}
            checked={allSelected}
            onChange={() =>
              handleChange(allSelected ? [] : options.map(({ value }) => value))
            }
            label="All"
          />
        )}
        {options.map(({ value, label }) => {
          const key = `${props.id}-${value}`;
          return (
            <CheckboxInput
              id={key}
              key={key}
              checked={props.value.includes(value)}
              onChange={() =>
                handleChange(
                  props.value.includes(value)
                    ? props.value.filter((v) => v !== value)
                    : [...props.value, value]
                )
              }
              label={label}
            />
          );
        })}
      </div>
    </InputWrapper>
  );
}

export default CheckboxGroup;
