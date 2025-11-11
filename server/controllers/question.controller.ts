import Question from "../models/Question.Model";
import { Response } from "express";
import { AuthRequest } from "../types/types";

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
    // upload the question to the collection
    const populatedQuestion = await newQuestion.populate(
      "author",
      "name email"
    );
    await newQuestion.save();
    return res.status(201).json(populatedQuestion);
  } catch (error) {
    res.status(400).json(error);
  }

  //to ensure the author name is populated before responding back
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
//testing
// Get only the current user's questions
export const getUserQuestions = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user._id;
    const userQuestions = await Question.find({ author: userId })
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json(userQuestions);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteQuestion = async (req: AuthRequest, res: Response) => {
  try {
    //To delete a question
    // You must have made the question
    //You must know the question id
    // You must find the question to check if it can be deleted
    const questionId = req.params.id;
    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: "No Question Found" });
    }
    //we now have the question here
    //check that the user id is same as question author
    const userId = req.user?._id;
    if (userId !== question.author) {
      return res.status(401).json({ message: "User not the same as author" });
    }
    //Now we know its the same user & question exists so delete it
    await Question.findByIdAndDelete(questionId);
    return res
      .status(201)
      .json({ message: "Succesfully deleted the Question" });
    //Once you know this - delete from the database
  } catch (error) {
    console.error(`Deleted Question Error: ${error}`);
    res.status(500).json({ message: " DeleteQuestion error" });
  }
};

export const updateQuestion = async (req: AuthRequest, res: Response) => {
  try {
    //check question exists
    const questionId = req.params.id;

    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    //AUTHOR ONLY CAN UPDATE IT
    const userId = req.user?._id;
    if (userId !== question.author.toString()) {
      return res
        .status(401)
        .json({ message: "Unauthorised User Updating Question" });
    }
    //Update Question - Title, Content, Tags
    const { title, content, tags } = req.body;
    if (title) {
      question.title = title;
    }
    if (content) {
      question.content = content;
    }
    if (tags) {
      question.tags = tags;
    }
    await question.save();
    res.status(200).json(question);
  } catch (error) {
    console.error(`Update Question Error: ${error}`);
    res.status(401).json({ message: "Error at Update Error" });
  }
};
