import type React from "react";
import type { BaseInputProps } from "./InputWrapper";

interface CheckboxProps extends BaseInputProps {
  checked: boolean;
  handleChange: (checked: boolean) => void;
  gap?: number;
}

export default function CheckboxInput({
  id,
  label,
  error,
  required = false,
  disabled = false,
  className = "",
  checked,
  handleChange,
  gap,
}: CheckboxProps) {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(event.target.checked);
  };

  return (
    <div style={{ gap: gap ? `${gap}px` : undefined }} className={["flex items-center w-fit", className].join(" ")}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={`w-4 h-4 text-raimon-blue bg-gray-100 border-gray-300 rounded focus:ring-raimon-blue focus:ring-2 ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"} ${error ? "border-red-500" : ""} ${className}`}
      />
      {label && (
        <label htmlFor={id} className={`text-sm ${disabled ? "text-gray-400 cursor-not-allowed" : "cursor-pointer"}`}>
          {label}
        </label>
      )}
    </div>
  );
}
