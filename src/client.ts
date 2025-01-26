import { GatewayIntentBits } from "discord.js";
import MyClient from "./utils/Client.js";
import { env } from "./utils/ValidEnv.js";

const client = new MyClient({
    intents: [
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
    ],
});

export const connect = () => {
    client.login(env.TOKEN);
};

export const getClient = () => {
    return client;
};
