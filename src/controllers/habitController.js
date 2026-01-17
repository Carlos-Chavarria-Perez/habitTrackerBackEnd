import { pool } from "../models/db.js";
import { habitQueries } from "../models/habitQueries.js";

const success = (res, message, data) => {
  return res.status(200).json({ success: true, message, data });
};

const failure = (res, status, message, error) => {
  return res.status(status).json({ success: false, message, error });
};

export const createHabit = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const { title, description, xp_reward } = req.body;
    const result = await pool.query(habitQueries.createHabit, [
      userId,
      title,
      description,
      xp_reward,
    ]);

    return success(res, `${title} has been created`, result.rows[0]);
  } catch (error) {
    return failure(res, 500, "Failed to create habit", error.message);
  }
};

export const completeHabit = async (req, res) => {
  try {
    const { habit_id } = req.params;

    if (!habit_id) {
      return res.status(400).json({ error: "Habit Id is requiered" });
    }

    const result = await pool.query(habitQueries.completeHabit, [habit_id]);

    return success(res, "Progress Recorded", result.rows[0]);
  } catch (error) {
    return failure(res, 500, "Failed to record progress", error.message);
  }
};

export const deleteHabit = async (req, res) => {
  try {
    const { habit_id } = req.params;

    if (!habit_id) {
      return failure(res, 400, "Habit Id is required", error.message);
    }
    const result = await pool.query(habitQueries.deleteHabit, [
      req.user.user_id,
      habit_id,
    ]);

    return success(res, "Habit deleted", result.rows[0]);
  } catch (error) {
    return failure(res, 500, "Failed to delete habit", error.message);
  }
};

export const getHabitById = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const { habit_id } = req.params;
    const result = await pool.query(habitQueries.getHabitById, [
      userId,
      habit_id,
    ]);
    if (result.rows.length === 0) {
      return failure(res, 400, "Habit not found", error.message);
    }
    return success(res, "Success", result.rows[0]);
  } catch (error) {
    return failure(res, 500, "Failed to get habit", error.message);
  }
};

export const updateHabit = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const { habit_id } = req.params;
    const { title, description, xp_reward,active } = req.body;

    const result = await pool.query(habitQueries.updateHabit, [
      userId,
      habit_id,
      title,
      description,
      xp_reward,
      active
    ]);
  return success(res, `${title} has been updated`, result.rows[0]);
  } catch (error) {
    return failure(res, 500, "Failed to update habit", error.message);
  }
};
