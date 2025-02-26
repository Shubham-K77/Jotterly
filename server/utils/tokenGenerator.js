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
    httpOnly: true, //HTTP-ONLY
    secure: false, //Development
    maxAge: 3600000, //1h
    sameSite: "Strict", //CSRF
  });
};

export default generate;
