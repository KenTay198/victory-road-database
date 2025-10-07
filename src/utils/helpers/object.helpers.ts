const ObjectHelpers = {
  removeProperty<T>(obj: Record<string, any>, prop: string): T {
    const newObj = { ...obj };
    delete newObj[prop];
    return newObj as T;
  },
};

export default ObjectHelpers;
