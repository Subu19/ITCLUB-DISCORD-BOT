import {
  ChatInputCommandInteraction,
  PermissionFlagsBits,
  SlashCommandBuilder,
} from "discord.js";
import { GuildModel } from "../models/GuildModel";
import { getClient } from "../client";

export const data = new SlashCommandBuilder()
  .setName("resolve")
  .setDescription("Conclude/Resolve your active ticket.")
  .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
  .addStringOption((option) =>
    option
      .setName("text")
      .setRequired(false)
      .setDescription("Write something about the ticket.")
  );

export async function execute(interaction: ChatInputCommandInteraction) {
  const guild = await GuildModel.findOne({ guildId: interaction.guildId });
  //check if it is admin!
  if (guild) {
    //if it is a user
    const ticket = guild.tickets.find(
      (ticket) => ticket.userId === interaction.user.id && !ticket.isResolved
    );
    if (ticket) {
      try {
        const channel = await getClient().channels.fetch(ticket.channelId);
        channel?.delete();

        ticket.isResolved = true;
        await guild.save();

        const user = await getClient().users.fetch(interaction.user.id);
        user.send(
          "Successfully removed your ticket. Hope your issue was resolved!"
        );
      } catch (err) {
        ticket.isResolved = true;
        await guild.save();
        console.log(err);
        interaction.reply(
          "Looks like your ticket channel doesn't exists. We have removed your ticket!"
        );
      }
    } else if (
      interaction.memberPermissions?.has(PermissionFlagsBits.ManageChannels)
    ) {
      //user is an admin.
      const channel = await getClient().channels.fetch(interaction.channelId);
      if (channel) {
        const ticket = guild.tickets.find(
          (ticket) => ticket.channelId === channel.id && !ticket.isResolved
        );
        if (ticket) {
          await channel.delete();
          ticket.isResolved = true;
          await guild.save();
          const user = await getClient().users.fetch(interaction.user.id);
          user.send("Successfully forced to delete a ticket!");
        } else {
          await interaction.reply("Hey! this is not a ticket channel.");
        }
      }
    } else {
      interaction.reply("You don't have any tickets pending.");
    }
  }
}
