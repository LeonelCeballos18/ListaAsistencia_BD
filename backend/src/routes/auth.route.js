import express from "express";
import { signup, login, logout, checkAuth } from "../controllers/auth.controller";
import { verifyToken } from "../middleware/verifyToken.js";
import { log } from "console";

const router = express.Router();

router.get("/check-auth", verifyToken, checkAuth);

router.post("/signup", signup);
router.post("/login", login);
router.post("logout", logout)

export default router;