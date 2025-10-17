import mongoose, { type Mongoose } from "mongoose";

declare global {
  var mongoClient: Mongoose | undefined;
}

export const connectMongo = async () => {
  if (globalThis.mongoClient) return globalThis.mongoClient;

  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI not defined");

  globalThis.mongoClient = await mongoose.connect(uri, {
    dbName: "prod", // process.env.NODE_ENV === "production" ? "prod" : "dev",
  });

  console.log("✅ MongoDB connected");
  return globalThis.mongoClient;
};
