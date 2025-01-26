import { ChatInputCommandInteraction, PermissionFlagsBits, SlashCommandBuilder, TextChannel } from "discord.js";
import { GuildModel } from "../models/GuildModel";

export const data = new SlashCommandBuilder()
    .setName("disablewelcome")
    .setDescription("Disable Welcome channel notification!")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels);

export async function execute(interaction: ChatInputCommandInteraction) {
    //check if the channel provided is valid

    const guild = await GuildModel.findOne({
        guildId: interaction.guild?.id,
    });
    //check if guild exists in database
    if (guild) {
        //register channel
        guild.welcomeChannel = "";
        await guild.save();
    } else {
        //register guild and the channel
        const guild = new GuildModel();
        guild.welcomeChannel = "";
        guild.guildId = interaction.guild?.id || "";
        await guild.save();
    }
    await interaction.reply(`Disabled Welcome notification!`);
}
