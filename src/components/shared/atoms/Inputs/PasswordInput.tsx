"use client";
import React, { useEffect, useState } from "react";
import { inputClassName } from "./variables";
import { IBaseProps } from "./types";
import InputWrapper from "./InputWrapper";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IPasswordRequirements } from "@/types/types";
import { getPasswordRequirements } from "@utils/functions";
import { passwordSpecialChars } from "@utils/variables";

interface IProps
  extends IBaseProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  id: string;
  handleChange?: (val: string) => void;
  complexPassword?: boolean;
}

function PasswordInput({
  labelClassName,
  divClassName,
  className,
  label,
  handleChange,
  error,
  errorMessage,
  complexPassword,
  ...props
}: IProps) {
  const [passwordRequirements, setPasswordRequirements] =
    useState<IPasswordRequirements>({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const wrapperProps = {
    labelClassName,
    divClassName,
    error,
    label,
    id: props.id,
    required: props.required,
    errorMessage,
  };

  const VisibleIcon = passwordVisible ? FaEyeSlash : FaEye;

  useEffect(() => {
    if (props.value) {
      setPasswordRequirements(getPasswordRequirements(props.value as string));
    } else setPasswordRequirements({});
  }, [props.value]);

  const isFalse = (key: keyof IPasswordRequirements) =>
    passwordRequirements[key] !== undefined &&
    passwordRequirements[key] === false;

  return (
    <InputWrapper {...wrapperProps}>
      <div
        className={[
          "flex items-center",
          inputClassName,
          "p-0 pr-2",
          className,
        ].join(" ")}
      >
        <input
          {...props}
          type={passwordVisible ? "text" : "password"}
          onChange={(e) => {
            if (handleChange) handleChange(e.target.value);
          }}
          className={[inputClassName, "w-full"].join(" ")}
        />
        <VisibleIcon
          className="cursor-pointer"
          size={20}
          onClick={() => setPasswordVisible(!passwordVisible)}
        />
      </div>
      {complexPassword && (
        <ul className="flex flex-col gap-1 pl-5 list-disc text-left">
          <li className={isFalse("length") ? "text-red-500" : ""}>
            More than 8 characters
          </li>
          <li className={isFalse("upperLetter") ? "text-red-500" : ""}>
            Contains at least one uppercase letter
          </li>
          <li className={isFalse("lowerLetter") ? "text-red-500" : ""}>
            Contains at least one lowercase letter
          </li>
          <li className={isFalse("number") ? "text-red-500" : ""}>
            Contains at least one number
          </li>
          <li className={isFalse("specialChar") ? "text-red-500" : ""}>
            Contains at least one special character among :{" "}
            {passwordSpecialChars}
          </li>
        </ul>
      )}
    </InputWrapper>
  );
}

export default PasswordInput;
