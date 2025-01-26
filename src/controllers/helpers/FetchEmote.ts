import { Emoji, GuildEmoji } from "discord.js";
import { config } from "../../config";
import { getClient } from "../../client";

export const FetchBotEmote = (name: string) => {
    let emoji: Emoji | undefined;
    config.EmoteServers.map((serverId) => {
        const emote = getClient()
            .guilds.cache.get(serverId)
            ?.emojis.cache.find((emote) => emote.name === name);
        if (emote) emoji = emote;
    });
    return emoji;
};
