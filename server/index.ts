import "dotenv/config";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import { Expense } from "./models/Expense";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.get("/api/expenses", async (_request, response) => {
  const expenses = await Expense.find().sort({ date: -1 });
  response.json(expenses);
});

app.post("/api/expenses", async (request, response) => {
  try {
    const { amount, category, date, notes } = request.body;

    const expense = await Expense.create({
      amount: Number(amount),
      category,
      date,
      notes,
    });

    response.status(201).json(expense);
  } catch {
    response.status(400).json({ message: "Invalid expense data" });
  }
});

app.delete("/api/expenses/:id", async (request, response) => {
  await Expense.findByIdAndDelete(request.params.id);
  response.status(204).send();
});

mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => {
    app.listen(port, () => {
      console.log(`API running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  });
