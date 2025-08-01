//Importing the Router here
import { Router } from "express";
import { registerUser, loginUser } from "../controllers/auth.controller";

//Defining my routes

//Registration Route
//Needs to get data from req.body
//Validate data, check exists
//Check the user exists
//Hash the password
//Create a user in the database
//Return success or error message
const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
