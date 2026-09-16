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

// update budget
budgetRouter.put("/api/budget/:id", async (request, response) => {
  try {
    const { currencyCode, currency, budget } = request.body;
    const budgetData = await Budget.findByIdAndUpdate(
      request.params.id,
      { currencyCode, currency, budget, date: new Date() },
      { new: true, runValidators: true },
    );

    if (!budgetData) {
      response.status(404).json({ message: "Budget not found" });
      return;
    }

    response.json(budgetData);
  } catch {
    response.status(400).json({ message: "Invalid budget data" });
  }
});

// get current budget, the last inserted and recent
budgetRouter.get("/api/budget/current", async (_request, response) => {
  const budget = await Budget.findOne().sort({ createdAt: -1 }).limit(1);
  response.json(budget);
});

//get budget by id
budgetRouter.get("/api/budget/:id", async (request, response) => {
  const budget = await Budget.findById(request.params.id);
  response.json(budget);
});

export default budgetRouter;
