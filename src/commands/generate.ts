import { ChatInputCommandInteraction, Guild, GuildMember, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { generateBanner } from "../controllers/helpers/BannerGenerator";

export const data = new SlashCommandBuilder()
    .setName("generate")
    .setDescription("Generate image")
    .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages);

export async function execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply();
    const attachement = await generateBanner(interaction.member as GuildMember, interaction.guild as Guild);
    await interaction.editReply({ files: [attachement] });
}
