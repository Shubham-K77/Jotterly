//Imports:
import express from "express";
import userModel from "./users.model.js";
import { generateHash, compareHash } from "../../utils/hashGenerate.js";
import { generateOtp } from "../../utils/otpGenerator.js";
import generate from "../../utils/tokenGenerator.js";

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
      message:
        "Account created successfully! Please verify your email to complete registration.",
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
//Validate The User:
userRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      const error = new Error("Missing information");
      res.status(400); //Bad-Request
      return next(error);
    }
    const userExists = await userModel.findOne({ email });
    if (!userExists) {
      const error = new Error("No user found with the email provided");
      res.status(400); //Bad-Request
      return next(error);
    }
    const emailValidation = userExists.emailValidate;
    if (!emailValidation) {
      const error = new Error("Email isn't validated");
      res.status(401); //Un-Authorized
      return next(error);
    }
    const isPasswordValid = await compareHash(password, userExists.password);
    if (!isPasswordValid) {
      const error = new Error("Password was incorrect");
      res.status(401);
      return next(error);
    }
    generate(req, res, userExists);
    return res.status(200).send({
      message: "Successfully verified",
      status: 200,
    });
  } catch (error) {
    error.message = "Internal Server Error!";
    res.status(500);
    next(error);
  }
});
//Export:
export default userRouter;
