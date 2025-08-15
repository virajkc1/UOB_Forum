import { Response } from "express";
import { AuthRequest } from "../types/types";
import Answer from "../models/Answer.Model";
import Question from "../models/Question.Model";
import User from "../models/User.Model";

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

    const answerId = req.params.id;
    if (!answerId) {
      return res.status(400).json({ message: "AnswerId Not Found" });
    }
    const answer = await Answer.findById(answerId);
    if (answer?.author.toString() !== req.user?._id.toString()) {
      return res.status(403).json({ message: "Unauthorised User" });
    }
    const questionId = answer?.questionId;
    if (!questionId) {
      return res.status(400).json({ message: "QuestionId Not Found" });
    }

    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: "Question not in Database" });
    }

    //Delete the answer
    await Answer.deleteOne({ _id: answerId });
    //Delete the answer from question array
    question.answers = question.answers.filter(
      (id) => id.toString() !== answerId.toString()
    );
    await question.save();

    res.status(200).json({ message: "Answer deleted successfully" });
  } catch (error) {
    console.error("deleteAnswer Controller Error");
    return res.status(500).json(error);
  }
};

//getAnswer by User
export const getAnswerUser = async (req: AuthRequest, res: Response) => {
  //Request sent, check the user exists with user Id part of Auth
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).json({ message: "UserId doesnt exist" });
    }
    //check a user with that userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const userAnswers = await Answer.find({ author: userId });
    return res.status(200).json(userAnswers);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "getAnswerUser error" });
  }

  // For that user - we then get all Answers with answer.author == user_id

  //
};

//get all Answer by Question
export const getAnswerQuestion = async (req: AuthRequest, res: Response) => {
  try {
    //
    const questionId = req.params.id;
    if (!questionId) {
      return res.status(400).json({ message: "QuestionId does not exist" });
    }
    //now check if the id has  a valid question with it
    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(400).json({ message: "Question not Found" });
    }
    //now you have a valid question in the database
    //any user can see this btw

    //get all answers for the specific question now
    const answers = await Answer.find({ questionId });
    if (!answers) {
      return res
        .status(400)
        .json({ message: "No answers found for this question" });
    }
    res.status(200).json(answers);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "getAnswerQuestion internal server error" });
  }
};

//updateAnswer - youll need the id of the answer you want :answerId
export const updateAnswer = async (req: AuthRequest, res: Response) => {
  try {
    //you need to know the id of the user
    const answerId = req.params.id;
    if (!answerId) {
      return res.status(400).json({ message: "No Answer Id found" });
    }
    //answer id is enterred
    const answer = await Answer.findById(answerId);
    if (!answer) {
      return res.status(400).json({ message: "No answer found" });
    }
    //answer is in the documents

    //check the answer author is same as the user in AuthRequest
    const userId = req.user?._id;
    const { content } = req.body;
    if (userId.toString() !== answer.author.toString()) {
      return res.status(400).json({ message: "User not authorised" });
    }
    //user allowed to update the Answer as they are the author
    if (content) {
      answer.content = content;
    }
    await answer.save();
    res.status(200).json(answer);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "updatAnswer controller error " });
  }
};
