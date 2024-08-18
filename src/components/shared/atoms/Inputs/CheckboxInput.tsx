import React from "react";
import { IBaseProps } from "./types";

interface IProps
  extends IBaseProps,
    React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
}

function CheckboxInput({ className, label, ...props }: IProps) {
  return (
    <div className={["flex items-center gap-1", className].join(" ")}>
      <input {...props} type="checkbox" checked={props.checked} />
      <label htmlFor={props.id}>{label}</label>
    </div>
  );
}

export default CheckboxInput;
