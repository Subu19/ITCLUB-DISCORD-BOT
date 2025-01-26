import { UserInterface } from "../../models/User";

export function generateOTP(length: number = 6): string {
    let otp = "";
    const characters = "0123456789";
    const charactersLength = characters.length;

    // Generate OTP of the specified length
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charactersLength);
        otp += characters[randomIndex];
    }

    return otp;
}
interface OTPInterface {
    otp: string;
    user: UserInterface;
}
export const TEMPOTP: Map<string, OTPInterface> = new Map();
