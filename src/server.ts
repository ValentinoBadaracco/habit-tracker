import express from "express";
import dotenv from "dotenv";
import pool from "./db";

import habitsRouter from "./routes/habits.route";

dotenv.config();

const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.json());


app.use('/habits', habitsRouter)

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
