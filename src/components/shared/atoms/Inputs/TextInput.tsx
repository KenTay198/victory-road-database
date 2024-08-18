import React from "react";
import { inputClassName } from "./variables";
import { IBaseProps } from "./types";
import InputWrapper from "./InputWrapper";

interface IProps
  extends IBaseProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  id: string;
  handleChange?: (val: string) => void;
}

function TextInput({
  labelClassName,
  divClassName,
  className,
  label,
  handleChange,
  error,
  errorMessage,
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
        onChange={(e) => {
          if (handleChange) handleChange(e.target.value);
        }}
        className={[inputClassName, className].join(" ")}
      />
    </InputWrapper>
  );
}

export default TextInput;
