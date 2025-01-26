import { ChannelType, ChatInputCommandInteraction, OverwriteType, PermissionFlagsBits, SlashCommandBuilder, User } from "discord.js";
import { GuildModel } from "../models/GuildModel";
import { TicketModel } from "../models/TicketModel";
import { getClient } from "../client";
import { dateFormatter } from "../controllers/helpers/Dateformatter";

export const data = new SlashCommandBuilder()
    .setName("ticket")
    .setDescription("Create a ticket to get in tough with all admins!")
    .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
    .addStringOption((option) => option.setName("subject").setRequired(true).setDescription("What is this ticket about?"));

export async function execute(interaction: ChatInputCommandInteraction) {
    const user: User = interaction.user;
    const guild = await GuildModel.findOne({ guildId: interaction.guildId });
    if (guild) {
        const ticket = guild.tickets.find((ticket) => ticket.userId === user.id && !ticket.isResolved);
        if (ticket) {
            //user already has ticket
            await interaction.reply(`You already have a ticket. Please use \`/resolve\` command inside <#${ticket.channelId}>`);
            return;
        } else {
            //user has no ticket and can create ticket
            const discordGuild = await getClient().guilds.fetch(guild.guildId);
            const channel = await discordGuild.channels.create({
                name: `${user.displayName.toLowerCase()}'s ticket`,
                type: ChannelType.GuildText,
                topic: "Subject: " + (interaction.options.getString("subject") || ""),
                permissionOverwrites: [
                    {
                        id: user.id,
                        type: OverwriteType.Member,
                        allow: [
                            PermissionFlagsBits.ViewChannel,
                            PermissionFlagsBits.SendMessages,
                            PermissionFlagsBits.AttachFiles,
                            PermissionFlagsBits.EmbedLinks,
                            PermissionFlagsBits.ReadMessageHistory,
                        ],
                    },
                    {
                        id: discordGuild.id,
                        type: OverwriteType.Role,
                        deny: [PermissionFlagsBits.ViewChannel],
                    },
                ],
            });
            const newTicket = new TicketModel();
            newTicket.channelId = channel.id;
            newTicket.userId = user.id;
            newTicket.subject = interaction.options.getString("subject") || "";
            newTicket.isResolved = false;
            await newTicket.save();
            guild.tickets.push(newTicket);
            await guild.save();
            await interaction.reply(`Your Ticket was created! Click here : <#${channel.id}>`);

            channel.send(
                `Ticket Creator: <@${user.id}>\nSubject: **${interaction.options.getString("subject") || ""}**\nCreated at: ${dateFormatter(
                    new Date()
                )}\nPing: @everyone`
            );

            const _user = await getClient().users.fetch(interaction.user.id);
            _user.send("Your ticket was created! Please use `/resolve` command in the server when you are done with your ticket.");
        }
    } else {
        //guild doesnt exists!
        await interaction.reply("Guild doesn't exist. Please use `/register` command if you are admin!");
    }
}
