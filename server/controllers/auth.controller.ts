import User from "../models/User.Model";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
//Above are Typescript interfaces inbuilt in Express for TypeScript
dotenv.config();

export const registerUser = async (req: Request, res: Response) => {
  try {
    //CHECK ALL FIELDS PRESENT FOR THE SCHEMA
    //gain all the details from the request body that should be in the User Model
    console.log(req.body);
    const { name, email, password, role, year } = req.body;
    if (!name || !email || !password || !year) {
      return res.status(400).json({ message: "All fields must be entered" });
    }
    const userRole = role || "student";
    //check the user exists - if so DONT REGISTER THEM, ACCOUNT ALREADY MADE
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Account already created, Please try Login" });
    }

    //Hash your password
    const hashedPassword = await bcrypt.hash(password, 10);

    //Adding a new user to the schema

    const newUser = new User({
      // i didnt use the spread operator here as what if the user has additional fields in the request
      name,
      email,
      password: hashedPassword,
      year,
      role: userRole,
    });

    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(400).json({ message: `${error}` });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    //Get the request info
    const { email, password } = req.body;
    //Validation of input entries
    if (!email || !password) {
      return res.status(400).json({ message: "Enter Email & Password" });
    }
    //Check if valid user in the database

    const existingUser = await User.findOne({ email });
    //this checks if the User Model in the collections under the email
    if (!existingUser) {
      return res.status(400).json({ message: "Not user found" });
    }

    //Compare your password with theres
    const isMatchPassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isMatchPassword) {
      return res.status(400).json({ message: "Incorrect Password" });
    }

    //At this part - you are a successful user with a correct password

    //Generate JWT
    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });
    //returns the token to the user
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(400).json(error);
  }
};
