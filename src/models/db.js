import dotenv from "dotenv";
import pkg from "pg";

dotenv.config();

const { Pool } = pkg;

export const pool = new Pool({
  connectionString: process.env.SUPABASE_DB_CONNECTION_STRING,
});

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
});
