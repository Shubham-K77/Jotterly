//Imports:
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
//Configuration:
dotenv.config();
const secret = process.env.JWT_SECRET;
//Function:
const tokenChecker = async (req, res, next) => {
  try {
    //Check Whether There Is Cookies Available!
    const userToken = req.cookies.userToken;
    if (!userToken) {
      const error = new Error("Token is missing!");
      res.status(401); //Un-Authorized!
      return next(error);
    }
    //Decode The Token!
    const userInfo = jwt.decode(userToken, secret);
    if (!userInfo) {
      const error = new Error("Invalid token was found!");
      res.status(403); //Forbidden
      return next(error);
    }
    //Set The Request Variable To Access Info:
    req.userData = userInfo;
    next();
  } catch (error) {
    error.message = "Invalid or Expired token";
    res.status(403); //Forbidden
    next(error);
  }
};

export default tokenChecker;
