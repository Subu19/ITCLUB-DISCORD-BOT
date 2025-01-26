import { dateFormatter } from "../../controllers/helpers/Dateformatter";

export const generateOTPEmail = (otp: string, full_name: string) => {
    const date = dateFormatter(new Date());
    return `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>Static Template</title>

        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet" />
    </head>
    <body style="margin: 0; font-family: 'Poppins', sans-serif; background: #ffffff; font-size: 14px">
        <div
            style="
                max-width: 680px;
                margin: 0 auto;
                padding: 45px 30px 60px;
                background: #f4f7ff;
                background-image: url(https://cdn.dribbble.com/users/2101653/screenshots/5650189/media/949e19b541dc94968d3adec63f6d9fd1.jpg?resize=1000x750&vertical=center);
                background-repeat: no-repeat;
                background-size: 800px 452px;
                background-position: top center;
                font-size: 14px;
                color: #434343;
            "
        >
            <header>
                <table style="width: 100%">
                    <tbody>
                        <tr style="height: 0">
                            <td style="display: flex; gap: 10px; align-items: center; color: white">
                                <img
                                    alt=""
                                    src="https://scontent.fktm3-1.fna.fbcdn.net/v/t39.30808-6/414723528_122094578300173510_3123852642620498065_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=6tsd89QaSYYQ7kNvgGw-xUI&_nc_oc=AdicQovXKVcgYPypAIubuFFJ8C9QYB3omrEPCBZr8_Aze3pPG9SMR7709XGhl--rxVM&_nc_zt=23&_nc_ht=scontent.fktm3-1.fna&_nc_gid=AbN_CYPUnBo290AfXqtAqhg&oh=00_AYB5WNUMUmNuyIOr4sddCpMG9ollWTATU1Sb-ZU6LB7lzw&oe=679982B8"
                                    height="50px"
                                    style="border-radius: 10px"
                                />

                                <h1>IT-Club KCC</h1>
                            </td>
                            <td style="text-align: right">
                                <span style="font-size: 16px; line-height: 30px; color: #ffffff">${date}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </header>

            <main>
                <div style="margin: 0; margin-top: 70px; padding: 92px 30px 115px; background: #ffffff; border-radius: 30px; text-align: center">
                    <div style="width: 100%; max-width: 489px; margin: 0 auto">
                        <h1 style="margin: 0; font-size: 24px; font-weight: 500; color: #1f1f1f">Your OTP</h1>
                        <p style="margin: 0; margin-top: 17px; font-size: 16px; font-weight: 500">Hey ${full_name},</p>
                        <p style="margin: 0; margin-top: 17px; font-weight: 500; letter-spacing: 0.56px">
                            Thank you for initiating your registration with IT-Club at Kantipur City College. This OTP is valid for
                            <span style="font-weight: 600; color: #1f1f1f">5 minutes</span>. Please enter this code in the verification prompt to
                            proceed.
                        </p>
                        <p style="margin: 0; margin-top: 60px; font-size: 40px; font-weight: 600; letter-spacing: 25px; color: #ba3d4f">${otp}</p>
                    </div>
                </div>
            </main>

            <footer style="width: 100%; max-width: 490px; margin: 20px auto 0; text-align: center; border-top: 1px solid #e6ebf1">
                <p style="margin: 0; margin-top: 40px; font-size: 16px; font-weight: 600; color: #434343">IT - CLUB</p>
                <p style="margin: 0; margin-top: 8px; color: #1a1a1a">Kantipur City College</p>
                <p style="margin: 0; margin-top: 0px; color: #434343">Putalisadak, Kathmandu</p>

                <div style="margin: 0; margin-top: 16px">
                    <a href="https://www.facebook.com/profile.php?id=61555205301587" target="_blank" style="display: inline-block">
                        <img
                            width="36px"
                            alt="Facebook"
                            src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661502815169_682499/email-template-icon-facebook"
                        />
                    </a>
                    <a href="https://www.instagram.com/kccitclub/" target="_blank" style="display: inline-block; margin-left: 8px">
                        <img
                            width="36px"
                            alt="Instagram"
                            src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661504218208_684135/email-template-icon-instagram"
                    /></a>
                </div>
            </footer>
        </div>
    </body>
</html>
`;
};
