//This is for your
import { Router } from "express";
import {
  createAnswer,
  deleteAnswer,
  getAnswerUser,
  getAnswerQuestion,
  updateAnswer,
} from "../controllers/answer.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.post("/", createAnswer);
router.put("/:id", updateAnswer);
router.delete("/:id", deleteAnswer);
router.get("/user/:id", getAnswerUser);
router.get("/question/:id", getAnswerQuestion);

export default router;
