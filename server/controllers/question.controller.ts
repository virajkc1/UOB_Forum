import Question from "../models/Question";
import { Response } from "express";
import { AuthRequest } from "../types";

//Create a question
export const createQuestion = async (req: AuthRequest, res: Response) => {
  try {
    //get the info you need
    const { title, content, tags } = req.body;

    //check required fields are present
    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }

    //NOTE: with AuthRequest you have the info about the user too - helpful for author
    const userId = req.user._id;
    //for each document you have a unique id
    // we are just using the id of the specific user in our database and storing it to use as our Author

    const newQuestion = new Question({
      title,
      content,
      tags: tags || [],
      author: userId,
    });
    //upload the question to the collection
    await newQuestion.save();

    return res.status(201).json({ message: "Successful Question Creation" });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getQuestion = async (req: AuthRequest, res: Response) => {
  try {
    const questionId = req.params.id;
    const question = await Question.findById(questionId).populate(
      "author",
      "name email"
    );
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    return res.status(200).json(question);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllQuestions = async (req: AuthRequest, res: Response) => {
  try {
    const allQuestions = await Question.find()
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json(allQuestions);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
