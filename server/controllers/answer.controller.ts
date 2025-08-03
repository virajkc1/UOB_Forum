import { Response } from "express";
import { AuthRequest } from "../types/types";
export const createAnswer = async (req: AuthRequest, res: Response) => {
  try {
    const { content } = req.body;
    //Create a question - get the content and then store the content in the Answer Document,
    // Need to add the answer to the answers section in Question
    //Create the Answer model
  } catch (error) {}
};
