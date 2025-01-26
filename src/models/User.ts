import { Schema, model } from "mongoose";

export interface UserInterface {
    _id?: string;
    email: string;
    full_name: string;
    phone_number: string;
    userId: string;
}

export const UserSchema = new Schema<UserInterface>({
    userId: String,
    email: String,
    full_name: String,
    phone_number: String,
});

export const UserModel = model<UserInterface>("User", UserSchema);
