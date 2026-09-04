import "dotenv/config";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import { Expense } from "./models/Expense";
import { Category } from "./models/Category";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// **********Routes expenses API************
// Get all expenses
app.get("/api/expenses", async (_request, response) => {
  const expenses = await Expense.find().sort({ date: -1 });
  response.json(expenses);
});

// Get last 3 expenses
app.get("/api/transactions/last", async (_request, response) => {
  const lastTransactions = await Expense.find().sort({ date: -1 }).limit(3);
  response.json(lastTransactions);
});

//Get the total expense for the current month
app.get("/api/expenses/total", async (_request, response) => {
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const endOfMonth = new Date();
  endOfMonth.setMonth(endOfMonth.getMonth() + 1);
  endOfMonth.setDate(0);
  endOfMonth.setHours(23, 59, 59, 999);

  const expenses = await Expense.find({
    date: { $gte: startOfMonth, $lte: endOfMonth },
  });
  const totalExpenses = expenses.reduce(
    (total, expense) => total + expense.amount,
    0,
  );
  response.json({ totalExpenses });
});

//Get the total expense for the week
app.get("/api/expenses/total/week", async (_request, response) => {
  const startOfWeek = new Date();
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date();
  endOfWeek.setDate(endOfWeek.getDate() - endOfWeek.getDay() + 7);
  endOfWeek.setHours(23, 59, 59, 999);

  const expenses = await Expense.find({
    date: { $gte: startOfWeek, $lte: endOfWeek },
  });
  const totalExpenses = expenses.reduce(
    (total, expense) => total + expense.amount,
    0,
  );
  response.json({ totalExpenses });
});

// Create a new expense
app.post("/api/expenses", async (request, response) => {
  try {
    const { amount, category, date, notes, icon, colorCategory } = request.body;

    const expense = await Expense.create({
      amount: Number(amount),
      category,
      date,
      notes,
      icon,
      colorCategory,
    });

    response.status(201).json(expense);
  } catch {
    response.status(400).json({ message: "Invalid expense data" });
  }
});

// Delete an expense
app.delete("/api/expenses/:id", async (request, response) => {
  await Expense.findByIdAndDelete(request.params.id);
  response.status(204).send();
});

// **********Routes categories API************
// Get all categories
app.get("/api/categories", async (_request, response) => {
  const categories = await Category.find();
  response.json(categories);
});

// Get color of a category by name
app.get("/api/categories/:name/color", async (request, response) => {
  const category = await Category.findOne({ name: request.params.name });
  if (category) {
    response.json({ color: category.color });
  } else {
    response.status(404).json({ message: "Category not found" });
  }
});

// Add a new category
app.post("/api/categories", async (request, response) => {
  try {
    const { name, icon, color, budget } = request.body;
    const category = await Category.create({
      name,
      icon,
      color,
      budgetCurrent: 0,
      budgetMax: budget,
    });
    response.status(201).json(category);
  } catch {
    response.status(400).json({ message: "Invalid category data" });
  }
});

// Delete a category
app.delete("/api/categories/:id", async (request, response) => {
  await Category.findByIdAndDelete(request.params.id);
  response.status(204).send();
});

// Connect to MongoDB and start the server
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
