import { Router } from "express";
import {createHabit,completeHabit,deleteHabit, updateHabit, getHabitById} from "../controllers/habitController.js"
import {authMiddleware} from "../middleware/authMiddleware.js"

const router= Router()
// Create Habit
router.post("/createhabit",authMiddleware,createHabit)

// Complete Habit
router.post("/complete/:habit_id",authMiddleware, completeHabit)

// Delete Habit
router.delete("/delete/:habit_id",authMiddleware, deleteHabit)

// Update Habit
router.get("/:habit_id",authMiddleware, getHabitById)

router.patch("/edit/:habit_id",authMiddleware, updateHabit)

export default router