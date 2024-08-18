import React from "react";

interface IProps {
  label: string;
  required?: boolean;
  id: string;
  className?: string;
}

function InputLabel({ label, required, id, className }: IProps) {
  return (
    <label htmlFor={id} className={["font-semibold", className].join(" ")}>
      {label} {required ? " *" : ""}
    </label>
  );
}

export default InputLabel;
