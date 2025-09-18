//Importing the Router here
import { Router, Request } from "express";
import {
  registerUser,
  loginUser,
  logout,
  verifyAuth,
  verifyEmail,
} from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";

interface AuthRequest extends Request {
  user?: any;
} //if user exists, it will be added to the request object

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
router.post("/verify", verifyEmail);
router.post("/login", loginUser);

router.get("/profile", authMiddleware, (req: AuthRequest, res) => {
  return res.json({
    message: "Successful transmittion",
    user: req.user,
  });
});
router.get("/verifyAuth", authMiddleware, verifyAuth); // New route
router.post("/logout", logout); // New route
export default router;
