import { Response } from "express";
import { AuthRequest } from "../types/types";
import Answer from "../models/Answer.Model";
import Question from "../models/Question.Model";
export const createAnswer = async (req: AuthRequest, res: Response) => {
  try {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ message: "Content is needed" });
    }
    //Check the questionId is valid
    const questionId = req.body.questionId;
    if (!questionId) {
      return res.status(400).json({ message: "QuestionId not found" });
    }
    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: "Question Does Not Exist" });
    }
    const userId = req.user?._id;
    const answer = new Answer({
      content,
      author: userId,
      questionId,
    });
    await answer.save();
    // After saving the answer, add it to the question
    await Question.findByIdAndUpdate(questionId, {
      $push: { answers: answer._id },
    });
    res.status(201).json({ message: "Answer made successfully" });
  } catch (error) {
    console.error("Create Answer Controller Error");
    return res.status(500).json(error);
  }
};

export const deleteAnswer = async (req: AuthRequest, res: Response) => {
  try {
    //delete an answer
    //first find in the request, the relevant question
    const questionId = req.body.questionId;
    const answerId = req.params.id;
    if (!questionId) {
      return res.status(400).json({ message: "QuestionId Not Found" });
    }
    if (!answerId) {
      return res.status(400).json({ message: "AnswerId Not Found" });
    }

    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(400).json({ message: "Question not in Database" });
    }
    //Verifies that the answerId matches to the questionId
    const answer = await Answer.findById(answerId);
    if (!answer || answer.questionId?.toString() !== questionId) {
      return res.status(404).json({ message: "Answer not found" });
    }
    //Delete the answer
    await Answer.deleteOne({ _id: answerId });
    //Delete the answer from question array
    question.answers = question.answers.filter(
      (id) => id.toString() !== answerId
    );
    await question.save();

    res.status(200).json({ message: "Answer deleted successfully" });
  } catch (error) {
    console.error("deleteAnswer Controller Error");
    return res.status(500).json(error);
  }
};
