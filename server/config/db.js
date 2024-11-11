import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const initiatedDB = async () => {
  try {
    await mongoose.connect(process.env.DBURL);
    console.log("DataBase Server Started...");
  } catch (error) {
    console.log(error.message);
    return error;
  }
};
