import {
  ChatInputCommandInteraction,
  PermissionFlagsBits,
  SlashCommandBuilder,
  TextChannel,
} from "discord.js";
import { GuildModel } from "../models/GuildModel";
import {
  CHAT_CHANNELS,
  fetchChatChannels,
} from "../controllers/helpers/AiChat";

export const data = new SlashCommandBuilder()
  .setName("disablechat")
  .setDescription("Disable AI chat!")
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
  .addChannelOption((option) =>
    option
      .setName("channel")
      .setDescription("Ping a channel.")
      .setRequired(true)
  );

export async function execute(interaction: ChatInputCommandInteraction) {
  const channel = interaction.options.getChannel("channel");
  //check if the channel provided is valid

  if (channel instanceof TextChannel && CHAT_CHANNELS.has(channel.id)) {
    const guild = await GuildModel.findOne({
      guildId: interaction.guild?.id,
    });
    //check if guild exists in database
    if (guild) {
      //register channel
      guild.chatChannel = "";
      await guild.save();
    } else {
      //register guild and the channel
      const guild = new GuildModel();
      guild.chatChannel = "";
      guild.guildId = interaction.guild?.id || "";
      await guild.save();
    }
    await interaction.reply(`Disabled chat!`);
    fetchChatChannels();
  } else {
    await interaction.reply("The channel you provided is not a valid channel!");
  }
}
