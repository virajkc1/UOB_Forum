import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    votes: { type: Number, required: true, default: 0 },
    tags: { type: [String], required: true },
    isResolved: { type: Boolean, required: true, default: false },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    answers: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Answer",
    },
  },
  { timestamps: true }
);

const Question = mongoose.model("Question", questionSchema);
//Note that for defining a model - you must use the Model name and should be in pascal case then the schema

export default Question;
