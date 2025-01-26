import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonInteraction,
    ButtonStyle,
    CacheType,
    Interaction,
    MessageFlags,
    ModalActionRowComponentBuilder,
    ModalBuilder,
    ModalSubmitInteraction,
    TextChannel,
    TextInputBuilder,
    TextInputStyle,
} from "discord.js";
import { sendMail } from "../../utils/SMTP";
import { generateOTP, TEMPOTP } from "./OTP";
import { GuildModel } from "../../models/GuildModel";
import { UserModel } from "../../models/User";
import { generateOTPEmail } from "../../assets/templates/OTPTemplate";

export const openVerificationModel = (interaction: ButtonInteraction) => {
    try {
        const model = new ModalBuilder().setCustomId("VerifyModel").setTitle("Student Details");

        const fullNameInput = new TextInputBuilder().setCustomId("FullName").setLabel("Full Name").setStyle(TextInputStyle.Short).setRequired(true);

        const emailInput = new TextInputBuilder()
            .setCustomId("Email")
            .setLabel("Email")
            .setStyle(TextInputStyle.Short)
            .setRequired(true)
            .setPlaceholder("student@kcc.edu.np");

        const phoneInput = new TextInputBuilder()
            .setCustomId("Phone")
            .setLabel("Phone Number")
            .setStyle(TextInputStyle.Short)
            .setRequired(true)
            .setMaxLength(10)
            .setMinLength(10)
            .setPlaceholder("98xxxxxxxx");

        model.addComponents(
            new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(fullNameInput),
            new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(emailInput),
            new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(phoneInput)
        );

        interaction.showModal(model);
    } catch (error) {
        console.error("Error in openVerificationModel:", error);
        interaction.reply({ content: "An error occurred while opening the verification model.", flags: MessageFlags.Ephemeral });
    }
};

const handleVerificationSubmit = async (interaction: ModalSubmitInteraction<CacheType>) => {
    try {
        const fullName = interaction.fields.getTextInputValue("FullName");
        const phone = interaction.fields.getTextInputValue("Phone");
        const email = interaction.fields.getTextInputValue("Email");

        const OTP = generateOTP(5);
        const text = generateOTPEmail(OTP, fullName);

        await interaction.deferReply({ flags: MessageFlags.Ephemeral });
        await sendMail(email, "Verification Code IT-Club KCC Registration!", "", text);

        TEMPOTP.set(interaction.user.id, {
            otp: OTP,
            user: { email, full_name: fullName, phone_number: phone, userId: interaction.user.id },
        });
        setTimeout(() => {
            TEMPOTP.delete(interaction.user.id);
        }, 300000);

        const OTPButton = new ButtonBuilder().setCustomId("OTPbutton").setEmoji("📨").setLabel("Provide OTP").setStyle(ButtonStyle.Success);

        const row = new ActionRowBuilder<ButtonBuilder>().addComponents(OTPButton);

        await interaction.editReply({
            content: `Email has been sent to \`${email}\`. Please provide the OTP.\nExpires in: <t:${Math.floor((Date.now() + 60 * 1000) / 1000)}:R>`,
            components: [row],
        });
    } catch (error) {
        console.error("Error in handleVerificationSubmit:", error);
        TEMPOTP.delete(interaction.user.id);
        await interaction.editReply({
            content: "An error occurred or time expired. Please try again.",
            components: [],
        });
    }
};

const handleOTPModel = async (interaction: ButtonInteraction) => {
    const model = new ModalBuilder().setCustomId("OTPModel").setTitle("Verify OTP");
    const otpInput = new TextInputBuilder()
        .setCustomId("OtpInput")
        .setLabel("OTP from your mail.")
        .setStyle(TextInputStyle.Short)
        .setRequired(true)
        .setPlaceholder("12345");
    model.addComponents(new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(otpInput));
    await interaction.showModal(model);
};

const handleOTPModelSubmit = async (interaction: ModalSubmitInteraction<CacheType>) => {
    try {
        const userInput = interaction.fields.getTextInputValue("OtpInput");
        const OTPdata = TEMPOTP.get(interaction.user.id);

        if (!OTPdata) {
            return interaction.reply({ content: "OTP session expired. Please try again.", flags: MessageFlags.Ephemeral });
        }

        if (userInput === OTPdata.otp) {
            const member = interaction.guild?.members.cache.get(interaction.user.id);
            const role = interaction.guild?.roles.cache.find((r) => r.id === process.env.VERIFIED_ROLE_ID);

            if (!member || !role) {
                return interaction.reply({ content: "Verification failed due to a server error.", flags: MessageFlags.Ephemeral });
            }

            const guild = await GuildModel.findOne({ guildId: interaction.guildId });

            if (guild) {
                const user = await UserModel.findOne({ email: OTPdata.user.email });
                if (user) {
                    //if user aleady exists, update discord user id and details
                    user.userId = OTPdata.user.userId;
                    user.full_name = OTPdata.user.full_name;
                    user.phone_number = OTPdata.user.phone_number;
                    user.save();
                } else {
                    const newUser = new UserModel({
                        email: OTPdata.user.email,
                        phone_number: OTPdata.user.phone_number,
                        full_name: OTPdata.user.full_name,
                        userId: interaction.user.id,
                    });
                    await newUser.save();
                    guild.users.push(newUser);
                }
                await guild.save();
                await member.roles.add(role);
                await member.setNickname(OTPdata.user.full_name);
                TEMPOTP.delete(interaction.user.id);
                return interaction.reply({ content: "You have been successfully verified!", flags: MessageFlags.Ephemeral });
            }
        } else {
            return interaction.reply({ content: "Invalid OTP. Please try again.", flags: MessageFlags.Ephemeral });
        }
    } catch (error) {
        console.error("Error in handleOTPModelSubmit:", error);
        await interaction.reply({ content: "An unexpected error occurred. Please try again later.", flags: MessageFlags.Ephemeral });
    }
};

export const routeVerificationModel = (interaction: Interaction) => {
    try {
        if (interaction.isButton()) {
            if (interaction.customId === "OTPbutton") handleOTPModel(interaction);
            else if (interaction.customId === "VerifyUser") openVerificationModel(interaction);
        } else if (interaction.isModalSubmit()) {
            if (interaction.customId === "VerifyModel") {
                handleVerificationSubmit(interaction);
            } else if (interaction.customId === "OTPModel") {
                handleOTPModelSubmit(interaction);
            }
        }
    } catch (error) {
        console.error("Error in routeVerificationModel:", error);
    }
};
