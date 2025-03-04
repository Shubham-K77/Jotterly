//Imports:
import express from "express";
import userModel from "./users.model.js";
import { generateHash, compareHash } from "../../utils/hashGenerate.js";
import { generateOtp, generateCode } from "../../utils/otpGenerator.js";
import generate from "../../utils/tokenGenerator.js";
import tokenChecker from "../../middleware/tokenCheck.js";
import sendMail from "../../utils/generateMail.js";

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
//Get Logged In User Info:
userRouter.get("/userInfo", tokenChecker, async (req, res, next) => {
  try {
    const userInfo = req.userData;
    const userExists = await userModel
      .findById(userInfo._id)
      .select("-password");
    if (!userExists) {
      const error = new Error("LoggedIn user doesn't exist in the platform!");
      res.status(403); //Forbidden
      return next(error);
    }
    res
      .status(200)
      .send({ message: "User is LoggedIn!", status: 200, userExists });
  } catch (error) {
    error.message = "Internal Server Error!";
    res.status(500); //Internal-Error
    next(error);
  }
});
//Logout From System:
userRouter.post("/logout", tokenChecker, async (req, res, next) => {
  try {
    req.userData = "";
    res.cookie("userToken", "", {
      httpOnly: true,
      secure: false, //Development
      sameSite: "strict",
      maxAge: 0,
    });
    res.status(200).send({ message: "Logged-Out Successfully!", status: 200 });
  } catch (error) {
    error.message = "Internal Server Error!";
    res.status(500);
    next(error);
  }
});
//Verify The Account:
userRouter.post("/sendMail", async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const userExists = await userModel.findOne({ email, name });
    if (!userExists) {
      const error = new Error("Email isn't found in the system!");
      res.status(401); //Un-Authorized!
      return next(error);
    }
    if (userExists.emailValidate === false) {
      const validateMail = await sendMail(
        "userCreate",
        userExists.email,
        userExists.emailOtp
      );
      if (!validateMail) {
        const error = new Error("Internal Error! Mail Generation Failed!");
        res.status(500);
        return next(error);
      }
    } else {
      const resetOtp = generateOtp();
      const resetCode = generateCode();
      const updateUser = await emailExists.findByIdAndUpdate(userExists._id, {
        passwordOtp: resetOtp,
        passwordResetCode: resetCode,
      });
      if (!updateUser) {
        const error = new Error("Internal Error! DB Update Failed!");
        res.status(500);
        return next(error);
      }
      const updateMail = await sendMail(
        "resetPassword",
        updateUser.email,
        updateUser.passwordOtp
      );
      if (!updateMail) {
        const error = new Error("Internal Error! Mail Generation Failed!");
        res.status(500);
        return next(error);
      }
    }
    res.status(200).send({ message: "Email delivered!", status: 200 });
  } catch (error) {
    error.message = "Internal Server Error!";
    res.status(500);
    next(error);
  }
});
//Export:
export default userRouter;
