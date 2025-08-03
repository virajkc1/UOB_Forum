//This is for your
import { Router } from "express";
import { createAnswer } from "../controllers/answer.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.use("/", authMiddleware, createAnswer);

export default router;
