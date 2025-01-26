import {
  BaseInteraction,
  ChatInputCommandInteraction,
  PermissionFlagsBits,
  SlashCommandBuilder,
} from "discord.js";
import { deployCommands } from "../deploy-commands";

export const data = new SlashCommandBuilder()
  .setName("reloadcommands")
  .setDescription("Reregisters all commands!")
  .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages);

export async function execute(interaction: ChatInputCommandInteraction) {
  if (interaction.guild) {
    await deployCommands({ guildId: interaction.guild.id.toString() });
    await interaction.reply("Done reloading!");
  } else {
    interaction.reply("Something went wrong!");
  }
}
