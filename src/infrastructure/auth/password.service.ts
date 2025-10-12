import bcrypt from "bcryptjs";

const PasswordService = {
  hash: async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  },
  compare: async (password: string, hashed: string): Promise<boolean> => {
    return bcrypt.compare(password, hashed);
  },
};

export default PasswordService;
