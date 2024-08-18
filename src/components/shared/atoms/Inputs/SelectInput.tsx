import React from "react";
import { inputClassName } from "./variables";
import { IBaseProps } from "./types";
import InputWrapper from "./InputWrapper";

interface IProps
  extends IBaseProps,
    Omit<React.InputHTMLAttributes<HTMLSelectElement>, "onChange"> {
  id: string;
  options: { value: string; label: string }[];
  handleChange: (val: string) => void;
  withEmptyOption?: boolean;
}

function SelectInput({
  options,
  labelClassName,
  divClassName,
  className,
  label,
  error,
  errorMessage,
  handleChange,
  withEmptyOption,
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

  const trueOptions = withEmptyOption
    ? [{ value: "", label: props.placeholder }, ...options]
    : options;

  return (
    <InputWrapper {...wrapperProps}>
      <select
        {...props}
        onChange={(e) => handleChange(e.target.value)}
        className={[inputClassName, className].join(" ")}
      >
        {trueOptions.map(({ value, label }) => {
          const key = `${props.id}-${value}`;
          return (
            <option key={key} id={key} value={value}>
              {label}
            </option>
          );
        })}
      </select>
    </InputWrapper>
  );
}

export default SelectInput;
