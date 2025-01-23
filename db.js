import mongoose from "mongoose";

export const ConnectDB = async () => {
  const MONGO_URI = process.env.MONGO_URI;

  if (!MONGO_URI) {
    throw new Error("MONGO_URI is not defined in environment variables.");
  }

  try {
    if (mongoose.connection.readyState === 1) {
      console.log("MongoDB already connected.");
      return;
    }

    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Database connected successfully.");
  } catch (error) {
    console.error("Database connection failed:", error);
    throw error;
  }
};
