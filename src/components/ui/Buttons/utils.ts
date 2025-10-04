import type { AppTemplate } from "@/utils/types";
//#region TYPES
export type IButtonSize = "S" | "M" | "L";
//#endregion

//#region FUNCTIONS
type ButtonClassNameParams = {
  template: AppTemplate;
  size: IButtonSize;
  className?: string;
  active?: boolean;
  disabled?: boolean;
};
export const getButtonsClassName = ({ template, size, className, active, disabled }: ButtonClassNameParams) => {
  const classNames = ["font-semibold rounded border-2 cursor-pointer duration-200 hover:bg-white"];
  switch (template) {
    case "blue":
      if (active) classNames.push("bg-white text-raimon-blue");
      else if (disabled) classNames.push("opacity-50 cursor-not-allowed");
      else classNames.push("bg-raimon-blue text-white border-raimon-blue hover:text-raimon-blue");
      break;
    case "darkBlue":
      if (active) classNames.push("bg-white text-raimon-blue-dark");
      else if (disabled) classNames.push("opacity-50 cursor-not-allowed");
      else classNames.push("bg-raimon-blue-dark text-white border-raimon-blue-dark hover:text-raimon-blue-dark");
      break;
    case "yellow":
      if (active) classNames.push("bg-white text-raimon-yellow");
      else if (disabled) classNames.push("opacity-50 cursor-not-allowed");
      else classNames.push("bg-raimon-yellow text-black border-raimon-yellow hover:text-raimon-yellow");
      break;
    case "darkYellow":
      if (active) classNames.push("bg-white text-raimon-yellow-dark");
      else if (disabled) classNames.push("opacity-50 cursor-not-allowed");
      else classNames.push("bg-raimon-yellow-dark text-black border-raimon-yellow-dark hover:text-raimon-yellow-dark");
      break;
    default:
      break;
  }

  switch (size) {
    case "S":
      classNames.push("text-sm py-1 px-2");
      break;
    case "M":
      classNames.push("text-base py-2 px-4");
      break;
    case "L":
      classNames.push("text-lg py-3 px-6");
      break;
    default:
      break;
  }

  if (className) classNames.push(className);
  return classNames.join(" ");
};
//#endregion
