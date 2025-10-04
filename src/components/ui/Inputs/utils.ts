export function getInputClasses(
  additionalClasses: string = "",
  hasError: boolean = false,
  isDisabled: boolean = false,
): string {
  const baseClasses = [
    "w-full",
    "px-2",
    "py-1",
    "rounded-md",
    "border",
    "transition-colors",
    "duration-200",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-raimon-blue",
    "focus:border-transparent",
  ];

  const errorClasses = hasError
    ? ["border-red-500", "bg-red-50"]
    : ["border-gray-300", "bg-white", "hover:border-gray-400"];

  const disabledClasses = isDisabled
    ? ["bg-gray-100", "text-gray-400", "cursor-not-allowed"]
    : ["text-gray-900"];

  const allClasses = [...baseClasses, ...errorClasses, ...disabledClasses];

  if (additionalClasses) {
    allClasses.push(additionalClasses);
  }

  return allClasses.join(" ");
}

export function getSelectClasses(
  additionalClasses: string = "",
  hasError: boolean = false,
  isDisabled: boolean = false,
): string {
  const selectSpecificClasses = "appearance-none cursor-pointer";
  return getInputClasses(
    `${selectSpecificClasses} ${additionalClasses}`.trim(),
    hasError,
    isDisabled,
  );
}

export function getTextInputClasses(
  additionalClasses: string = "",
  hasError: boolean = false,
  isDisabled: boolean = false,
): string {
  return getInputClasses(additionalClasses, hasError, isDisabled);
}

export function getNumberInputClasses(
  additionalClasses: string = "",
  hasError: boolean = false,
  isDisabled: boolean = false,
): string {
  return getInputClasses(additionalClasses, hasError, isDisabled);
}
