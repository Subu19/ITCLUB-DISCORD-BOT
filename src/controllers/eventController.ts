import { ChatInputCommandInteraction, Client, Guild, GuildMember, Interaction, Message, MessageFlags, MessageType, TextChannel } from "discord.js";
import { getClient } from "../client.js";
import { GuildModel } from "../models/GuildModel.js";
import { deployCommands } from "../deploy-commands.js";
import { commands } from "../commands";
import { generateBanner } from "./helpers/BannerGenerator.js";
import { CHAT_CHANNELS, HandleChat, fetchChatChannels } from "./helpers/AiChat.js";
import { routeVerificationModel } from "./helpers/HandleVerification.js";
export const ready = async (bot: Client) => {
    console.log(`Ready! Logged in as ${bot?.user?.tag}`);
    //fetch all AI chat channels from every guild
    fetchChatChannels();
};

export const onInteraction = async (interaction: Interaction | ChatInputCommandInteraction) => {
    if (interaction.isCommand()) {
        const { commandName } = interaction;
        if (commands[commandName as keyof typeof commands] && interaction instanceof ChatInputCommandInteraction) {
            commands[commandName as keyof typeof commands].execute(interaction);
        }
    }
    if (interaction.isButton() || interaction.isModalSubmit()) {
        try {
            routeVerificationModel(interaction);
        } catch (e) {
            interaction.reply({ content: "Something went wrong!!", flags: MessageFlags.Ephemeral });
            console.log(e);
        }
    }
};

export const onMessage = async (message: Message) => {
    if (message.author.bot || message.type == MessageType.Reply) return;
    // check if its a message in AI chat channels.
    if (CHAT_CHANNELS.has(message.channel.id)) {
        HandleChat(message);
    }
};

//guild create listener
export const onGuildCreate = async (guild: Guild) => {
    await deployCommands({ guildId: guild.id });
    const _guild = await GuildModel.findOne({ guildId: guild.id });
    if (!_guild) {
        const newGuild = new GuildModel();
        newGuild.guildId = guild.id;
        newGuild.save();
    }
};

export const onNewMember = async (member: GuildMember) => {
    const guild = await getClient().guilds.fetch(member.guild.id);
    const _guild = await GuildModel.findOne({ guildId: guild.id });

    if (guild && _guild) {
        if (_guild.welcomeChannel) {
            try {
                const channel = await guild.channels.fetch(_guild.welcomeChannel);
                if (channel instanceof TextChannel) {
                    const bannerAttachement = await generateBanner(member, guild);
                    channel.send({ files: [bannerAttachement], content: `Welcome <@${member.id}>, hope you have a great time with us!` });
                }
            } catch (err) {
                console.log(err);
            }
        }
    } else {
        //guild not found!
    }
};
