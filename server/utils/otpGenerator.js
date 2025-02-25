//Import:
import crypto from "crypto";
import dotenv from "dotenv";
//Configure:
dotenv.config();
//Generate OTP:
const generateOtp = () => {
  const otp = crypto.randomInt(0, 1000000);
  return otp;
};
//Generate HexCode:
const generateCode = () => {
  const code = crypto.randomBytes(16).toString("hex");
  return code;
};
//Exports:
export { generateOtp, generateCode };
