import { ChatInputCommandInteraction, PermissionFlagsBits, SlashCommandBuilder, TextChannel } from "discord.js";
import { GuildModel } from "../models/GuildModel";
import { fetchChatChannels } from "../controllers/helpers/AiChat";

export const data = new SlashCommandBuilder()
    .setName("setverifylog")
    .setDescription("Set verification log channel!")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
    .addChannelOption((option) => option.setName("channel").setDescription("Ping a channel.").setRequired(true));

export async function execute(interaction: ChatInputCommandInteraction) {
    const channel = interaction.options.getChannel("channel");
    //check if the channel provided is valid
    if (channel instanceof TextChannel) {
        const guild = await GuildModel.findOne({
            guildId: interaction.guild?.id,
        });
        //check if guild exists in database
        if (guild) {
            //register channel
            guild.verifyLogChannel = channel.id;
            await guild.save();
        } else {
            //register guild and the channel
            const guild = new GuildModel();
            guild.verifyLogChannel = channel.id;
            guild.guildId = interaction.guild?.id || "";
            await guild.save();
        }
        await interaction.reply(`Okay, <#${channel.id}> channel will be used for verification logging!`);
        fetchChatChannels();
    } else {
        await interaction.reply("The channel you provided is not a text channel!");
    }
}
