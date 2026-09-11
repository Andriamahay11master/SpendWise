import "dotenv/config";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import { Expense } from "./models/Expense";
import { Category } from "./models/Category";
import { Budget } from "./models/Budget";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// **********Routes expenses API************

// Save budget
app.post("/api/budget", async (request, response) => {
  try {
    const { currencyCode, currency, budget } = request.body;
    const budgetData = await Budget.create({
      currencyCode,
      currency,
      budget,
      date: new Date(),
      libelle:
        "Budget" +
        " " +
        new Date().toLocaleString("en-US", { month: "long" }) +
        " " +
        new Date().getFullYear(),
    });
    response.status(201).json(budgetData);
  } catch {
    response.status(400).json({ message: "Invalid budget data" });
  }
});

//Get Current Budget
app.get("/api/budget/current", async (_request, response) => {
  try {
    const currentBudget = await Budget.findOne().sort({ date: -1 });
    response.json(currentBudget);
  } catch {
    response.status(400).json({ message: "Invalid budget data" });
  }
});

// Get all expenses
app.get("/api/expenses", async (_request, response) => {
  const expenses = await Expense.find().sort({ date: -1, createdAt: -1 });
  response.json(expenses);
});

// Get last 3 expenses
app.get("/api/transactions/last", async (_request, response) => {
  const lastTransactions = await Expense.find()
    .sort({ date: -1, createdAt: -1 })
    .limit(3);
  response.json(lastTransactions);
});

//Get the total expense for the current month
app.get("/api/expenses/total/month", async (_request, response) => {
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

//Get number of expenses for a specific category
app.get("/api/categories/:name/expenses/count", async (request, response) => {
  const categoryName = request.params.name;
  const count = await Expense.countDocuments({
    category: { $regex: new RegExp(`^${categoryName}$`, "i") },
  });
  response.json({ nbTransaction: count });
});

// Create a new expense
app.post("/api/expenses", async (request, response) => {
  try {
    const { amount, category, date, notes, icon, colorCategory, currency } =
      request.body;

    const expense = await Expense.create({
      amount: Number(amount),
      category,
      date,
      notes,
      icon,
      colorCategory,
      currency,
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

//Get the budgetCurrent for a specific category
app.get("/api/categories/:name/budgetCurrent", async (request, response) => {
  try {
    const category = await Category.findOne({ name: request.params.name });
    if (category) {
      response.json({ budgetCurrent: category.budgetCurrent });
    } else {
      response.status(404).json({ message: "Category not found" });
    }
  } catch {
    response.status(400).json({ message: "Invalid budget data" });
  }
});

//Update budgetCurrent for category
app.put("/api/categories/:name/budgetCurrent", async (request, response) => {
  try {
    const { budgetCurrent } = request.body;
    const category = await Category.findOneAndUpdate(
      { name: request.params.name },
      { budgetCurrent },
      { new: true },
    );
    if (category) {
      response.json(category);
    } else {
      response.status(404).json({ message: "Category not found" });
    }
  } catch {
    response.status(400).json({ message: "Invalid budget data" });
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
