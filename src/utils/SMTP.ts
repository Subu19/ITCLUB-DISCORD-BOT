import * as nodemailer from "nodemailer";
const port = process.env.SMTP_PORT;
const host = process.env.SMTP_HOST;
const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASS;
export const mailSender = nodemailer.createTransport({
    host: host,
    port: parseInt(port || "465"),
    secure: true,
    auth: {
        user: user,
        pass: pass,
    },
});

export const sendMail = async (to: string, subject: string, text?: string, html?: string) => {
    const mail = await mailSender.sendMail({
        from: `"IT-CLUB KCC 👻" <${process.env.SMTP_USER}>`,
        to: to,
        subject: subject,
        text: text,
        html: html,
    });
    return mail;
};
