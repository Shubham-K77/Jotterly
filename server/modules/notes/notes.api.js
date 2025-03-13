//Imports:
import noteModel from "./notes.model.js";
import userModel from "../users/users.model.js";
import express from "express";
import tokenChecker from "../../middleware/tokenCheck.js";
import axios from "axios";
import dotenv from "dotenv";
//Router:
const noteRouter = express.Router();
dotenv.config();
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
//AI Suggestion:
noteRouter.post("/suggest", async (req, res, next) => {
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
    res
      .status(200)
      .send({
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
//Export:
export default noteRouter;
