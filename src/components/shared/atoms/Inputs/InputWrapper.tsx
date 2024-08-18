import React from "react";
import InputLabel from "./InputLabel";
import { IBaseProps } from "./types";
import { defaultErrorMessage } from "./variables";

type IProps = IBaseProps & {
  children: React.ReactNode;
  id: string;
  required?: boolean;
};

function InputWrapper({
  children,
  label,
  error,
  errorMessage,
  divClassName,
  id,
  required,
  labelClassName,
}: IProps) {
  return (
    <div className={["flex flex-col gap-1 w-full", divClassName].join(" ")}>
      {label && (
        <InputLabel
          label={label}
          id={id}
          required={required}
          className={labelClassName}
        />
      )}
      {error && <p className="text-red-500">{errorMessage || defaultErrorMessage}</p>}
      {children}
    </div>
  );
}

export default InputWrapper;
