//Imports:
import noteModel from "./notes.model.js";
import userModel from "../users/users.model.js";
import express from "express";
import tokenChecker from "../../middleware/tokenCheck.js";
//Router:
const noteRouter = express.Router();
//Get The Notes:
noteRouter.get("/", tokenChecker, async (req, res, next) => {
  try {
    const userInfo = req.userData; //Logged In User
    const userExists = await userModel.findById(userInfo._id);
    if (!userExists) {
      const error = new Error("User wasn't found in the system!");
      res.status(401); //Un-Authorized!
      return next(error);
    }
    const dataFetched = await noteModel.find(); //Get All Notes
    if (!dataFetched) {
      const error = new Error("Internal DB-Server Error!");
      res.status(500); //Internal Error
      return next(error);
    }
    res.status(200).send({
      message: "All notes has been fetched!",
      status: 200,
      dataFetched,
    });
  } catch (error) {
    error.message = "Internal Server Error!";
    res.status(500); //Internal Error
    next(error);
  }
});
//Create New Note:
noteRouter.post("/create", tokenChecker, async (req, res, next) => {
  try {
    const { title, content, tags, userId } = req.body;
    if (!title || !content || !userId) {
      const error = new Error("Critical information is missing!");
      res.status(400); //Bad-Request
      return next(error);
    }
    const userExists = await userModel.findById(userId);
    if (!userExists) {
      const error = new Error("User wasn't found in the system!");
      res.status(401); //Un-Authorized!
      return next(error);
    }
    const createNote = await noteModel.create({
      title,
      content,
      tags,
      userId,
    });
    if (!createNote) {
      const error = new Error("Unable to create a new note!");
      res.status(500); //Internal DB Error
      return next(error);
    }
    res
      .status(201)
      .send({ message: "New note has been created!", status: 201, createNote });
  } catch (error) {
    error.message = "Internal Server Error!";
    res.status(500);
    next(error);
  }
});
//Delete Note:
noteRouter.delete("/delete", tokenChecker, async (req, res, next) => {
  try {
    const { postId } = req.body;
    if (!postId) {
      const error = new Error("Post Id must be provided!");
      res.status(400); //Bad-Request
      return next(error);
    }
    const postExists = await noteModel.findById(postId);
    if (!postExists) {
      const error = new Error(
        "The post information wasn't found in the system!"
      );
      res.status(400); //Bad-Request
      return next(error);
    }
    const deleteNote = await noteModel.findByIdAndDelete(postExists._id);
    if (!deleteNote) {
      const error = new Error(
        "Unable to delete the post! Internal DB-Server Error!"
      );
      res.status(500); //Internal-Error
      return next(error);
    }
    res
      .status(204)
      .send({ message: "Successfully Deleted!", status: 204, deleteNote });
  } catch (error) {
    error.message = "Internal Server Error!";
    res.status(500);
    next(error);
  }
});
//Export:
export default noteRouter;
