import mongoose from "mongoose";
import { env } from "./ValidEnv.js";
const uri = `mongodb+srv://${env.MONGODB_USER}:${env.MONGODB_PASS}@cluster0.8kll7.mongodb.net/${env.MONGODB_DB}?retryWrites=true&w=majority`;

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
