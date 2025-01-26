import { cleanEnv, str, num, host, url } from "envalid";
import "dotenv/config";
export const env = cleanEnv(process.env, {
    TOKEN: str(),
    CLIENT_ID: str(),
    GUILD_ID: str(),

    MONGODB_USER: str(),
    MONGODB_PASS: str(),
    MONGODB_DB: str(),

    VERIFIED_ROLE_ID: str(),

    SMTP_HOST: str(),
    SMTP_PORT: str(),
    SMTP_USER: str(),
    SMTP_PASS: str(),
});
