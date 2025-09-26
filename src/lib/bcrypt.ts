import bcrypt from "bcryptjs";

export const hashPassword = async (password: string) =>
  new Promise<string>((resolve, reject) => {
    try {
      if (!process.env.BCRYPT_SALT) return reject("No salt provided");
      const salt = parseInt(process.env.BCRYPT_SALT);
      const hash = bcrypt.hashSync(password, salt);
      resolve(hash);
    } catch (error) {
      reject(error);
    }
  });

export const isPasswordValid = (password: string, hash: string) =>
  new Promise<boolean>((resolve, reject) => {
    try {
      const result = bcrypt.compareSync(password, hash);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
