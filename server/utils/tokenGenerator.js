//Imports:
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
//Config:
dotenv.config();
const secret = process.env.JWT_SECRET;
//Generate JWT Token And Https Cookies!
const generate = (req, res, payload) => {
  const tokenPayload = {
    _id: payload._id,
    name: payload.name,
    email: payload.email,
  };
  const token = jwt.sign(tokenPayload, secret, { expiresIn: "1h" });
  res.cookie("userToken", token, {
    httpOnly: true,
    secure: true, // ✅ Required for HTTPS
    sameSite: "None", // ✅ Allows cross-site cookies
    maxAge: 3600000, // 1 hour
  });
};

export default generate;
