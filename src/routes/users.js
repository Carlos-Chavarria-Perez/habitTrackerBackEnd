import { Router } from "express";
import { signup,login,getProfile } from "../controllers/userController.js";
import {authMiddleware} from "../middleware/authMiddleware.js"

const router = Router();
router.post("/signup", signup);
router.post("/login", login);

// Get profile
router.get("/getprofile",authMiddleware, getProfile );

export default router;
