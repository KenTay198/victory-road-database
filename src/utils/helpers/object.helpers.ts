const ObjectHelpers = {
  getNestedProperty: (obj: Record<string, any>, key: string, nameKey?: string): any => {
    if (key.includes(".")) {
      const [firstKey, ...restKeys] = key.split(".");
      return ObjectHelpers.getNestedProperty(obj[firstKey], restKeys.join("."), nameKey);
    }
    return nameKey ? obj[key]?.[nameKey] : obj[key];
  },
};

export default ObjectHelpers;
