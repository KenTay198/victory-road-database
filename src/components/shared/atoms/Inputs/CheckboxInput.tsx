import React from "react";
import { IBaseProps } from "./types";

interface IProps
  extends IBaseProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  id: string;
  handleChange: (val: boolean) => void;
}

function CheckboxInput({ className, label, handleChange, ...props }: IProps) {
  return (
    <div className={["flex items-center gap-1", className].join(" ")}>
      <input
        {...props}
        type="checkbox"
        checked={props.checked}
        onChange={(e) => handleChange(e.target.checked)}
      />
      {label && <label htmlFor={props.id}>{label}</label>}
    </div>
  );
}

export default CheckboxInput;
