import React from "react";
import { inputClassName } from "./variables";
import { IBaseProps } from "./types";
import InputWrapper from "./InputWrapper";

interface IProps
  extends IBaseProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "type"> {
  id: string;
  handleChange: (val: number) => void;
}

function NumberInput({
  labelClassName,
  divClassName,
  className,
  label,
  value,
  handleChange,
  errorMessage,
  error,
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
      <input
        {...props}
        value={value?.toString() || ""}
        type="number"
        onChange={(e) => handleChange(parseInt(e.target.value))}
        className={[inputClassName, className].join(" ")}
      />
    </InputWrapper>
  );
}

export default NumberInput;
