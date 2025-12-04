import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB = async () => {
  try {
    const base = (process.env.MONGODB_URL || "").replace(/\/+$/, ""); // remove trailing slashes
    const dbName = (DB_NAME || "").replace(/^\/+/, "");               // remove leading slashes
    const url = `${base}/${dbName}`;

    // Optional: print the final url for debugging (but avoid printing credentials in production)
    console.log("mongo url ->", url);

    // connect (Mongoose v7+ doesn't require options, but you can add them if needed)
    const connection = await mongoose.connect(url /*, { useNewUrlParser: true, useUnifiedTopology: true }*/);

    console.log(`MongoDB connected: host = ${connection.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
