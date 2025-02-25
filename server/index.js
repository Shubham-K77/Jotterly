//Imports:
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/index.js";
import cookieParser from "cookie-parser";
import { notFoundError, errorHandle } from "./middleware/errorMw.js";
//Configure:
dotenv.config();
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use("/", router);
app.use(notFoundError);
app.use(errorHandle);
//Constants:
const port = process.env.PORT;
const dbUrl = process.env.mongoDbUrl;
//Logic:
mongoose
  .connect(dbUrl)
  .then(() => {
    app.listen(port, () => {
      console.log("Connected To DB!");
      console.log(`App Is Running In Port: ${port}`);
      console.log(`URL => http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log("Error Connecting To DB!");
    console.error(error);
  });
