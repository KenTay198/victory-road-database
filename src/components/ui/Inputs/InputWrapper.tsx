import type React from "react";

export interface BaseInputProps {
  id: string;
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  handleChange: (...args: any[]) => void;
}

interface InputWrapperProps extends Omit<BaseInputProps, "handleChange"> {
  children: React.ReactNode;
}

export default function InputWrapper({
  id,
  label,
  description,
  error,
  required = false,
  disabled = false,
  className = "",
  children,
}: InputWrapperProps) {
  return (
    <div className={`flex flex-col space-y-1 ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className={`text-sm font-medium text-gray-700 ${disabled ? "text-gray-400" : ""}`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {description && (
        <p
          className={`text-xs text-gray-500 ${disabled ? "text-gray-400" : ""}`}
        >
          {description}
        </p>
      )}

      <div className="relative">{children}</div>

      {error && (
        <p className="text-xs text-red-600 mt-1" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
