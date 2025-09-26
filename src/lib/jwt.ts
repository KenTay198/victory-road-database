import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET;

export const verifyAccessToken = async (token: string): Promise<any> =>
  new Promise((resolve, reject) => {
    if (!jwtSecret) return reject("A secret key must be provided");

    jwt.verify(token, jwtSecret, (error, payload) => {
      if (error) return reject(error);

      if (typeof payload === "object") {
        delete payload?.iat;
        delete payload?.exp;
      }

      return resolve(payload);
    });
  });

export const signAccessToken = (data: any, expiresIn = "15m"): Promise<any> =>
  new Promise((resolve, reject) => {
    if (!jwtSecret) return reject("A secret key must be provided");

    jwt.sign(
      data,
      jwtSecret,
      { expiresIn }, //seconds
      (error, token) => {
        if (error) reject(error);
        resolve(token);
      }
    );
  });
