//Imports:
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/index.js";
//Configure:
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use("/", router);
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
