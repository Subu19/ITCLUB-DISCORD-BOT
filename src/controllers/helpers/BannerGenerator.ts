import * as Canvas from "@napi-rs/canvas";
import { AttachmentBuilder, Guild, GuildMember } from "discord.js";
import path from "path";
export const generateBanner = async (user: GuildMember, guild: Guild) => {
    console.log(Canvas.GlobalFonts.families);
    console.log(Canvas.GlobalFonts.registerFromPath("./src/assets/ARIAL.TTF", "MyFont"));
    const canvas = Canvas.createCanvas(500, 250);
    const context = canvas.getContext("2d");
    const background = await Canvas.loadImage("./src/assets/images/welcomeBanner.png");
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
