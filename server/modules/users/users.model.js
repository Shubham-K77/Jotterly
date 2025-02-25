//Imports:
import mongoose from "mongoose";
//Check Email:
const checkEmail = (email) => {
  const regEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regEx.test(email);
};
//Configure:
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name Is Compulsory For Application!"],
    },
    email: {
      type: String,
      unique: [true, "Email address must be unique to users!"],
      required: [true, "Email is compulsory for application!"],
      validate: {
        validator: checkEmail,
        message: "Please enter a valid email address!",
      },
    },
    password: {
      type: String,
      required: [true, "Password is compulsory for application!"],
    },
    emailOtp: {
      type: Number,
      default: null,
    },
    passwordOtp: {
      type: Number,
      default: null,
    },
    emailValidate: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
//Model:
const userModel = mongoose.model("users", userSchema);
//Export:
export default userModel;
