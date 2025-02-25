//Imports:
import express from "express";
import userRouter from "../modules/users/users.api.js";
//Configure:
const router = express.Router();
router.use("/api/v1/users", userRouter);
//Export:
export default router;
