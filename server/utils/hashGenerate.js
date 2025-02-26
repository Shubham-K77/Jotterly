//Import:
import bcrypt from "bcrypt";
import dotenv from "dotenv";
//Configure:
dotenv.config();
const round = parseInt(process.env.ROUND) || 10;
//Logic:
const generateHash = async (password) => {
  const salt = await bcrypt.genSalt(round);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};
const compareHash = async (password, hashPassword) => {
  const isValid = await bcrypt.compare(password, hashPassword);
  return isValid;
};
//Export:
export { generateHash, compareHash };
