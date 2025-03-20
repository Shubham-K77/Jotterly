//Imports:
import mongoose from "mongoose";
//Schema:
const noteSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title For The Notes Is Compulsory!"],
    },
    content: {
      type: String,
      required: [true, "Content/Description For The Notes Is Compulsory!"],
    },
    tags: {
      type: [String], //Array Of Values
      default: [], //Empty Array As Default
    },
    suggestions: {
      type: mongoose.Schema.Types.Mixed, //Object For Suggestions
      default: {}, //Empty Object
    },
    isPinned: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "User Must Be Specified For The Note!"],
      ref: "users",
    },
  },
  { timestamps: true }
);
//Model:
const noteModel = mongoose.model("notes", noteSchema);
//Export:
export default noteModel;
