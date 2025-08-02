import { Router } from "express";
//for questions you need to authenticate its a real user
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post("/", authMiddleware);

export default router;
