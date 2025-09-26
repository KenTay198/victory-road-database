import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

let cachedClient: mongoose.Mongoose | null = null;

async function preloadModels() {
  await import("@/models/character.model");
  await import("@/models/hissatsu.model");
}

export async function connectToDatabase() {
  if (!MONGODB_URI) {
    throw new Error(
      "Define the MONGODB_URI environment variable inside .env.local"
    );
  }

  if (cachedClient) {
    return cachedClient;
  }

  const client = await mongoose.connect(MONGODB_URI);

  await preloadModels();

  cachedClient = client;
  return client;
}
