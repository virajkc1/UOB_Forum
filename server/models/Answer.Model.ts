import mongoose from "mongoose";

const AnswerSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    votes: { type: Number, required: true, default: 0 },
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
  },
  { timestamps: true }
);

const Answer = mongoose.model("Answer", AnswerSchema);

export default Answer;
