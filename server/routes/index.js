//Imports:
import express from "express";
import userRouter from "../modules/users/users.api.js";
import noteRouter from "../modules/notes/notes.api.js";
//Configure:
const router = express.Router();
router.use("/api/v1/users", userRouter);
router.use("/api/v1/notes", noteRouter);
//Export:
export default router;
