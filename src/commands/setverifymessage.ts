import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ChatInputCommandInteraction,
    EmbedBuilder,
    PermissionFlagsBits,
    SlashCommandBuilder,
    TextChannel,
} from "discord.js";

export const data = new SlashCommandBuilder()
    .setName("setverifymessage")
    .setDescription("A permanent message to verify users through a model!")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels);

export async function execute(interaction: ChatInputCommandInteraction) {
    const channel = interaction.channel as TextChannel;
    const message = await interaction.reply("Generating verify Embeded message!");
    //create embed
    const embed = new EmbedBuilder();
    embed.setAuthor({ name: interaction.guild?.name || "IT-Club KCC", iconURL: interaction.guild?.iconURL() || "" });
    embed.setTitle("Verify you are a student at KCC");
    embed.setDescription(
        "Welcome to the Kantiput City College verification process!\nTo ensure you are a current student, please click the button below and fill out a short form. This will help us confirm your enrollment status.\nOnce you've completed the form, we'll review your submission and grant access to student-only channels.\nThank you for your cooperation!"
    );
    embed.setColor("White");

    //create verify button
    const button = new ButtonBuilder();
    button.setCustomId("VerifyUser");
    button.setEmoji("✔️");
    button.setStyle(ButtonStyle.Primary);
    button.setLabel("Verify");
    //create action row component containner
    const row = new ActionRowBuilder<ButtonBuilder>();
    row.addComponents(button);

    //send verification message
    if (channel && channel?.isTextBased()) {
        await channel.send({ content: "", components: [row], embeds: [embed] });
        message.delete();
    }
}
