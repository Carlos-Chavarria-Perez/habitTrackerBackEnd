import { pool } from "../models/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userQueries } from "../models/userQueries.js";

export const signup = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate inputs
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "User name and password requiered" });
    }

    // Hash password
    const saltrounds = 10;
    const hashedpassword = await bcrypt.hash(password, saltrounds);

    // Saved in DB

    const result = await pool.query(userQueries.createUser, [
      username,
      hashedpassword,
    ]);

    return res.status(201).json({
      message: "User created",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({ error: error.message || "Unknown error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate is user exists
    const result = await pool.query(userQueries.getUserByUsername, [username]);

    if (result.rows.length === 0) {
      return res.status(400).json({ error: "Invalid Username or Password" });
    }
    const user = result.rows[0];

    // Compare password with stored password
    const ismatch = await bcrypt.compare(password, user.password);

    if (!ismatch) {
      return res.status(400).json({ error: "Invalid Username or Password" });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    // Create JWT Token
    const token = jwt.sign(
      { user_id: user.user_id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return res.status(200).json({
      message: "Login Sucessful",
      token,
      user: { user_id: user.user_id, username: user.username },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const userId = req.user.user_id;

    const result = await pool.query(userQueries.getProfile, [userId]);

    return res.status(200).json({
      message: "Success",
      data: result.rows,
    });
  } catch (error) {
    res.status(500).json({ error: error.message || "Unknown error" });
  }
};
