import express from "express";
import cors from "cors";
import usersRouter from "./src/routes/users.js";
import habitRouter from "./src/routes/habits.js"


const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", usersRouter);
app.use("/habits", habitRouter);


export default app;
