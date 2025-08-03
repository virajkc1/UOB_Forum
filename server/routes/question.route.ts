import { Router } from "express";
//for questions you need to authenticate its a real user
import { authMiddleware } from "../middleware/auth.middleware";
import {
  createQuestion,
  deleteQuestion,
  getAllQuestions,
  getQuestion,
  updateQuestion,
} from "../controllers/question.controller";

const router = Router();

//POST REQUESTS
router.post("/", authMiddleware, createQuestion);
//GET REQUESTS
router.get("/:id", authMiddleware, getQuestion);
router.get("/", authMiddleware, getAllQuestions);
//DELETE REQUESTS
router.delete("/:id", authMiddleware, deleteQuestion);
//PUT REQUESTS
router.put("/:id", authMiddleware, updateQuestion);

export default router;
