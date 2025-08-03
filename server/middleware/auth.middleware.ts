import dotenv from "dotenv";
import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.Model";
import { AuthRequest } from "../types/types";

dotenv.config(); //configures environment variables

//Steps
export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    //Extract the JWT
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Access token invalid" });
    }

    //Verify the token with JWT Secret
    //Checking if untampered with by checking the secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    }; //just stores info and user ID about the user in JWT
    // we make the token in login and then store it, we then are checking if its valid and use the user id its been made for

    //decoded payload if valid
    //this is the actual data transmitted in the message

    //NOW Check the user is a valid user
    //check in the database

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    req.user = user;
    console.log(process.env.JWT_SECRET);
    console.log(token);
    next();
  } catch (error) {
    return res.status(401).json({ message: error });
  }
};

//Middleware
//1. Extract the JWT from the request headers
//2, Verifies this JWT signature with the JWT_SECRET
//3. Verifies the decoded payload id with the i
