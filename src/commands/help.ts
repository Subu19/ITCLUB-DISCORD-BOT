import { ChatInputCommandInteraction, EmbedBuilder, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { GuildModel } from "../models/GuildModel";
import { getClient } from "../client";
import { botCommands } from ".";

export const data = new SlashCommandBuilder().setName("help").setDescription("Lists of available commands");

export async function execute(interaction: ChatInputCommandInteraction) {
    const embed = new EmbedBuilder();
    embed.setTitle("About me:");
    embed.setColor("Blue");
    let desc: string = "";
    desc +=
        "Hi! I am a Bot for ITCLUB. I am still in development, report bugs if you find them. \n\n If you are wondering how you can utilize me, please have a look at all the commands below:\n\n";

    botCommands.forEach((command, i) => {
        desc += `**${i + 1}. /${command.data.name}:**\`${command.data.description}\`\n`;
    });
    embed.setDescription(desc);
    interaction.reply({ embeds: [embed] });
}
