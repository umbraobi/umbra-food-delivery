import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ DB Connected");
  } catch (err) {
    console.error("❌ DB Connection Error:", err);
    process.exit(1); // exit if DB connection fails
  }
};
