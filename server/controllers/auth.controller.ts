import User from "../models/User.Model";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { AuthRequest } from "../types/types";
import { sendVerificationEmail } from "../api/brevo.api";
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
    const existingUser = await User.findOne({ email }).exec();
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Account already created, Please try Login" });
    }

    //Hash your password
    const hashedPassword = await bcrypt.hash(password, 10);

    //Adding a new user to the schema
    // i didnt use the spread operator here as what if the user has additional fields in the request

    // ✅ Generate a verification code and expiry time
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    const verificationExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      year,
      role: userRole,
      verified: false, //we add a unverified stage
      verificationCode,
      verificationExpires,
    });

    await newUser.save();

    // ✅ Send the verification code via email using Brevo
    await sendVerificationEmail(newUser.email, newUser.name, verificationCode);

    //Respond to frontend
    res.status(201).json({
      message:
        "Unverified User created and verification code sent successfully",
    });
  } catch (error) {
    res.status(400).json({ message: `${error}` });
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { email, code } = req.body;
    //Email or Code are missing
    if (!email || !code) {
      return res.status(400).json({ message: "Email and code are missing" });
    }
    //No user found
    const user = await User.findOne({ email }); //without await, you cant wait for response so you get a QUERY OBJECT - a pending database operation
    if (!user) {
      return res.status(400).json({ message: "No User Found" });
    }
    //User already verified
    if (user.verified) {
      return res.status(400).json({ message: "User already verified" });
    }
    if (!user.verificationCode || !user.verificationExpires) {
      return res.status(400).json({ message: "No verification code found" });
    }

    if (Date.now() > user.verificationExpires.getTime()) {
      return res.status(400).json({ message: "Verification code expired" });
    }

    if (user.verificationCode !== code) {
      return res.status(400).json({ message: "Invalid verification code" });
    }
    // ✅ Passed all checks → mark as verified
    user.verified = true;
    user.verificationCode = undefined;
    user.verificationExpires = undefined;
    await user.save();
    return res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
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

    //Set the cookie up with the token
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "development" ? false : true,
      sameSite: process.env.NODE_ENV === "development" ? false : true,
      maxAge: 30 * 60 * 1000, //TOKEN lasts for 30mins (add refresh tokens too)
    });

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(400).json(error);
  }
};
export const verifyAuth = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.status(200).json({ user });
  } catch (error) {
    res.status(401).json({ message: "Not authenticated" });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Logout failed" });
  }
};
