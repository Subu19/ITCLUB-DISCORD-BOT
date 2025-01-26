import * as Canvas from "@napi-rs/canvas";
import { AttachmentBuilder, Guild, GuildMember } from "discord.js";
import path from "path";
export const generateBanner = async (user: GuildMember, guild: Guild) => {
    console.log(Canvas.GlobalFonts.families);
    console.log(Canvas.GlobalFonts.registerFromPath("./src/assets/ARIAL.TTF", "MyFont"));
    const canvas = Canvas.createCanvas(500, 250);
    const context = canvas.getContext("2d");
    const background = await Canvas.loadImage(
        "https://cdn.discordapp.com/attachments/1332395764273385523/1332395800646516856/welcome_Banner.png?ex=679519c9&is=6793c849&hm=7a4c5042550df917d79f15f48697876cb5bb1a6d7fea8cda1f7497cbe3355412&"
    );
    context.drawImage(background, 0, 0, canvas.width, canvas.height);

    context.font = "20px MyFont";
    context.fillStyle = "#ffffff";
    context.fillText("Welcome", canvas.width / 2.5, 100);
    context.font = "bold 30px MyFont";
    context.fillStyle = "#10FF7E";
    context.fillText(user.displayName, canvas.width / 2.5, 145);
    context.font = "16px MyFont";
    context.fillStyle = "#FFFFFF";
    context.fillText("Enjoy  your stay at " + guild?.name, canvas.width / 2.5, 175);

    //set avatar
    const avatar = await Canvas.loadImage(user.displayAvatarURL({ extension: "jpg" }));
    context.beginPath();
    context.arc(103, 124, 75.5, 0, Math.PI * 2, true);
    context.closePath();
    context.clip();
    context.drawImage(avatar, 28, 49, 151, 151);

    //generate attachement
    return new AttachmentBuilder(canvas.toBuffer("image/png"), {
        name: "welcomebanner.png",
    });
};
