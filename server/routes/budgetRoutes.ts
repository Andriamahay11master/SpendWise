import { Router } from "express";
import { Budget } from "../models/Budget";

const budgetRouter = Router();

// create budget
budgetRouter.post("/api/budget", async (request, response) => {
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

//update budget
budgetRouter.put("/api/budget", async (request, response) => {
  try {
    const { currencyCode, currency, budget } = request.body;
    const budgetData = await Budget.findOneAndUpdate(
      {},
      { currencyCode, currency, budget, date: new Date() },
      { new: true },
    );
    response.status(201).json(budgetData);
  } catch {
    response.status(400).json({ message: "Invalid budget data" });
  }
});

// get current budget
budgetRouter.get("/api/budget/current", async (_request, response) => {
  try {
    const currentBudget = await Budget.findOne().sort({ date: -1 });
    response.json(currentBudget);
  } catch {
    response.status(400).json({ message: "Invalid budget data" });
  }
});

export default budgetRouter;
