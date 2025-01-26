import { Guild, Message } from "discord.js";
import { GuildModel } from "../../models/GuildModel";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { readFile } from "fs";
const openai = new OpenAI({
    apiKey: process.env.CHAT_API_KEY, // This is the default and can be omitted,
    baseURL: "https://api.naga.ac/v1",
});

export const CHAT_CHANNELS = new Map();

export const fetchChatChannels = async () => {
    const chatguilds = await GuildModel.find({});
    CHAT_CHANNELS.clear();
    chatguilds.map((guild) => {
        if (guild.chatChannel) {
            CHAT_CHANNELS.set(guild.chatChannel, guild.guildId);
        }
    });
    console.log("Fetched Ai channels!");
};

const CHAT_HISTORY = new Map<string, Array<ChatCompletionMessageParam>>();

//prepare instructions
var instructions: ChatCompletionMessageParam;
readFile("./src/assets/instructions/craftnepal.txt", { encoding: "utf8" }, (err, data) => {
    err
        ? console.log(err)
        : (instructions = {
              role: "system",
              name: "instructions",
              content: data,
          });
});

export const HandleChat = async (message: Message) => {
    if (message.inGuild()) message.channel.sendTyping();

    const userMessage: ChatCompletionMessageParam = {
        role: "user",
        content: message.content,
    };

    //fetch all chat history and store the user prompt at last.
    const chatHistory = CHAT_HISTORY.get(message.channel.id) || [];
    chatHistory?.push(userMessage);
    //check if chat history reached its limit

    if (chatHistory.length > 8) {
        chatHistory.shift();
    }
    CHAT_HISTORY.set(message.channel.id, chatHistory);

    //generate response from AI
    const completion = await openai.chat.completions.create({
        messages: [instructions, ...chatHistory],
        model: "gpt-3.5-turbo",
    });

    //save response to the chat history
    const response: ChatCompletionMessageParam = {
        role: "assistant",
        content: completion.choices[0].message.content?.toString(),
    };
    chatHistory.push(response);

    //check if chat history reached its limit
    if (chatHistory.length > 8) {
        chatHistory.shift();
    }
    CHAT_HISTORY.set(message.channel.id, chatHistory);

    message.reply({ content: filterString(completion.choices[0].message.content?.toString() ?? "Sorry, my brain left the chat") });
};

const filterString = (text: string) => {
    return text.replace("@everyone", "@ everyone").replace("@here", "@ here");
};
