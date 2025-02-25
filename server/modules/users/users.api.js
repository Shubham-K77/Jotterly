//Imports:
import express from "express";
import userModel from "./users.model.js";
import { generateHash, compareHash } from "../../utils/hashGenerate.js";
import { generateOtp } from "../../utils/otpGenerator.js";
//Configure:
const userRouter = express.Router();
//Create The User:
userRouter.post("/register", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const emailExists = await userModel.findOne({ email });
    if (emailExists) {
      const error = new Error("Email already in use!");
      res.status(400); //Bad-Request
      return next(error);
    }
    const hashPassword = await generateHash(password);
    const newUser = await userModel.create({
      name,
      email,
      password: hashPassword,
    });
    if (!newUser) {
      const error = new Error("Unable to create a user!");
      res.status(500); //Internal-Error
      return next(error);
    }
    const otp = generateOtp();
    await userModel.findByIdAndUpdate(newUser._id, {
      emailOtp: otp,
    });
    res.status(201).send({
      message: "New user created!",
      code: 201, //Created
      status: "Success!",
      newUser,
    });
  } catch (error) {
    error.message = "Internal Server Error!";
    res.status(500); //Internal-Error
    next(error);
  }
});
//Export:
export default userRouter;
