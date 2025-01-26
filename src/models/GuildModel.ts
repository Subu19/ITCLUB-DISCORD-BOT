import mongoose, { model, Schema } from "mongoose";
import { TicketInterface, TicketSchema } from "./TicketModel";
import { UserInterface, UserSchema } from "./User";

interface GuildInterface {
    guildId: string;
    tickets: TicketInterface[];
    welcomeChannel: string;
    chatChannel: string;
    users: UserInterface[];
}

var guildSchema = new Schema<GuildInterface>({
    guildId: {
        type: String,
        required: true,
    },
    tickets: {
        type: [TicketSchema],
    },
    welcomeChannel: {
        type: String,
    },
    chatChannel: {
        type: String,
    },
    users: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "User",
        },
    ],
});

export const GuildModel = model<GuildInterface>("Guild", guildSchema);
