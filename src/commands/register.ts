import { ChatInputCommandInteraction, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { GuildModel } from "../models/GuildModel";
import { getClient } from "../client";

export const data = new SlashCommandBuilder()
    .setName("register")
    .setDescription("Register your Discord Server Manually!")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

export async function execute(interaction: ChatInputCommandInteraction) {
    const guild = await GuildModel.find({ guildId: interaction.guildId });
    console.log(guild);
    if (guild && guild.length > 0) {
        //guild already is registered!
        await interaction.reply({
            content: "Guild is already registered!",
            ephemeral: true,
        });
    } else {
        //Register new guild!
        const newGuild = new GuildModel();
        newGuild.guildId = interaction.guildId || "";
        await newGuild.save();
        await interaction.reply({
            content: `Done! ${(await getClient().guilds.fetch(interaction.guildId || "")).name} was successfully registered!`,
            ephemeral: true,
        });
    }
}
