import mongoose from "mongoose";
import { env } from "./ValidEnv.js";
const uri = process.env.MONGO_URI || "";

export const connect = async () => {
    mongoose
        .connect(uri)
        .then(() => {
            console.log("MongoDB connected!");
        })
        .catch((err) => {
            console.log(err);
        });
};
