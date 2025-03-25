//Imports:
import noteModel from "./notes.model.js";
import userModel from "../users/users.model.js";
import express from "express";
import tokenChecker from "../../middleware/tokenCheck.js";
import axios from "axios";
import dotenv from "dotenv";
import mongoose from "mongoose";
//Router:
const noteRouter = express.Router();
dotenv.config();
//Get ALL The Notes:
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
//Get The User Notes:
noteRouter.get("/getNotes/:userId", tokenChecker, async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      const error = new Error("Credential Missing For Request!");
      res.status(400); //Bad-Request
      return next(error);
    }
    const userExists = await userModel.findById(userId);
    if (!userExists) {
      const error = new Error("User Not Found!");
      res.status(404); //Not-Found
      return next(error);
    }
    const fetchData = await noteModel
      .find({ userId: userId })
      .sort({ isPinned: -1, createdAt: 1 });
    if (!fetchData) {
      const error = new Error("Data Not Found In DB!");
      res.status(404); //Not-Found
      return next(error);
    }
    res.status(200).send({ message: "Data Fetched!", code: 200, fetchData });
  } catch (error) {
    error.message = "Internal Server Error!";
    res.status(500);
    next(error);
  }
});
//Create New Note:
noteRouter.post("/create", tokenChecker, async (req, res, next) => {
  try {
    const { title, content, category, tags, userId } = req.body;
    if (!title || !content || !userId || !category) {
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
      categories: category,
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
//Pin The Note:
noteRouter.patch("/pinNote", tokenChecker, async (req, res, next) => {
  try {
    const { userId, noteId } = req.body;
    if (!userId || !noteId) {
      const error = new Error("Credentials Missing For Request!");
      res.status(400); //Bad-Request
      return next(error);
    }
    const userExists = await userModel.findById(userId);
    if (!userExists) {
      const error = new Error("User Doesn't Exist!");
      res.status(404); //Not-Found
      return next(error);
    }
    const noteExists = await noteModel.findById(noteId);
    if (!noteExists) {
      const error = new Error("Note Doesn't Exist!");
      res.status(404); //Not-Found
      return next(error);
    }
    const noteByUser = await noteModel.find({
      _id: noteExists._id,
      userId: userExists._id,
    });
    if (!noteByUser) {
      const error = new Error(
        "Access Denied! You are not the creator of this note."
      );
      res.status(403); //Forbidden
      return next(error);
    }
    const updateNote = await noteModel.findByIdAndUpdate(
      noteExists._id,
      { isPinned: !noteExists.isPinned },
      { new: true }
    );
    if (!updateNote) {
      const error = new Error("Internal Database Error!");
      res.status(500);
      return next(error);
    }
    let message =
      updateNote.isPinned === true
        ? "Note has been pinned!"
        : "Note has been unpinned!!";
    res.status(200).send({ message, code: 200, updateNote });
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
      .status(200)
      .send({ message: "Successfully Deleted!", status: 200, deleteNote });
  } catch (error) {
    error.message = "Internal Server Error!";
    res.status(500);
    next(error);
  }
});
//AI Suggestion:
noteRouter.post("/suggest", tokenChecker, async (req, res, next) => {
  try {
    const apiUrl = process.env.gorqAIUrl;
    const apiKey = process.env.gorqAPIKey;
    const apiModel = process.env.gorqAIModel;
    const { task, desc } = req.body;
    if (!task || !desc) {
      const error = new Error("Information is missing!");
      res.status(400); //Bad-Request
      return next(error);
    }
    const prompt = `You are an AI assistant providing helpful suggestions for completing tasks. Based on the given task title and description, provide a three concise suggestions in the following JSON format with an actionable plan to complete the task. The JSON response should include:

- "suggestionText": A helpful suggestion or idea to complete the task.
- "actionPlan": A list of actionable steps to complete the task.

Please ensure the response is consistent and easy to parse on the front-end.

Task Title: ${task}
Task Description: ${desc}

Response format:
{
  "suggestionText": "<suggestion to complete the task>",
  "actionPlan": [
    "<step1>",
    "<step2>",
    "<step3>"
  ]
}`;
    const response = await axios.post(
      apiUrl,
      {
        model: apiModel,
        messages: [{ role: "user", content: prompt }],
        max_tokens: 175,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response) {
      const error = new Error("Internal Server Error! AI Model Error!");
      res.status(500);
      return next(error);
    }
    const suggest = response.data.choices[0].message.content;
    let parsedSuggestion = JSON.parse(suggest);
    res.status(200).send({
      message: "Suggestions generated!",
      code: 200,
      suggestion: parsedSuggestion,
    });
  } catch (error) {
    error.message = "Internal Server Error!";
    res.status(500);
    next(error);
  }
});
//Counting Categories:
noteRouter.get("/count/:UserId", tokenChecker, async (req, res, next) => {
  try {
    const { UserId } = req.params;
    if (!UserId) {
      const error = new Error("Id isn't provided in the request!");
      res.status(400); //Bad-Request
      return next(error);
    }
    const userExists = await userModel.findById(UserId);
    if (!userExists) {
      const error = new Error("The user doesn't exist in the system!");
      res.status(404); //Not-Found
      return next(error);
    }
    //Predefined Structure:
    const categoryCount = {
      all: 0,
      IdeaBox: 0,
      LifeCraft: 0,
      StudyNest: 0,
      ZenDen: 0,
      WorkFlow: 0,
    };
    const countCategories = await noteModel.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(UserId) } },
      { $group: { _id: "$categories", count: { $sum: 1 } } },
    ]);
    if (!countCategories) {
      const error = new Error("Internal Query Error!");
      res.status(500);
      return next(error);
    }
    const totalDocuments = await noteModel.countDocuments({
      userId: new mongoose.Types.ObjectId(UserId),
    });
    if (!totalDocuments) {
      const error = new Error("Internal Query Error!");
      res.status(500);
      return next(error);
    }
    categoryCount["all"] = totalDocuments;
    countCategories.forEach(
      (category) => (categoryCount[category._id] = category.count)
    );
    res
      .status(200)
      .send({ message: "Successfully counted!", code: 200, categoryCount });
  } catch (error) {
    error.message = "Internal Server Error!";
    res.status(500); //Internal-Error
    next(error);
  }
});
//Export:
export default noteRouter;
