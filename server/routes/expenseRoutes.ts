import { Router } from "express";
import { Expense } from "../models/Expense";
import { getMonthDateRange, getWeekDateRange } from "../utils/dateRanges";

const expenseRouter = Router();

expenseRouter.get("/api/expenses", async (_request, response) => {
  const expenses = await Expense.find().sort({ date: -1, createdAt: -1 });
  response.json(expenses);
});

expenseRouter.get("/api/transactions/last", async (_request, response) => {
  const lastTransactions = await Expense.find()
    .sort({ date: -1, createdAt: -1 })
    .limit(3);

  response.json(lastTransactions);
});

expenseRouter.get("/api/expenses/total/month", async (_request, response) => {
  const { startOfMonth, endOfMonth } = getMonthDateRange();

  const expenses = await Expense.find({
    date: { $gte: startOfMonth, $lte: endOfMonth },
  });

  const totalExpenses = expenses.reduce(
    (total, expense) => total + expense.amount,
    0,
  );

  response.json({ totalExpenses });
});

expenseRouter.get("/api/expenses/total/week", async (_request, response) => {
  const { startOfWeek, endOfWeek } = getWeekDateRange();

  const expenses = await Expense.find({
    date: { $gte: startOfWeek, $lte: endOfWeek },
  });

  const totalExpenses = expenses.reduce(
    (total, expense) => total + expense.amount,
    0,
  );

  response.json({ totalExpenses });
});

expenseRouter.get(
  "/api/categories/:name/expenses/count",
  async (request, response) => {
    const categoryName = request.params.name;

    const count = await Expense.countDocuments({
      category: { $regex: new RegExp(`^${categoryName}$`, "i") },
    });

    response.json({ nbTransaction: count });
  },
);

expenseRouter.post("/api/expenses", async (request, response) => {
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

expenseRouter.delete("/api/expenses/:id", async (request, response) => {
  await Expense.findByIdAndDelete(request.params.id);
  response.status(204).send();
});

export default expenseRouter;
