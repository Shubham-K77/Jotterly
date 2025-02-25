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
const compareHash = async (hashPassword, password) => {
  const isValid = await bcrypt.compare(hashPassword, password);
  return isValid;
};
//Export:
export { generateHash, compareHash };
