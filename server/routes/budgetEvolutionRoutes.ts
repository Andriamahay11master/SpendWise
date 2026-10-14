import { Router } from "express";
import EvolutionBudgetCategory from "../models/EvolutionBudgetCategory";

const budgetEvolutionRouter = Router();

//create budget evolution category
budgetEvolutionRouter.post(
  "/api/budget-evolution",
  async (request, response) => {
    try {
      const { category, budgetCurrent, budgetMax, username, dateBudget } =
        request.body;

      const budgetEvolution = await EvolutionBudgetCategory.create({
        category,
        budgetCurrent,
        budgetMax,
        username,
        dateBudget,
      });

      response.status(201).json(budgetEvolution);
    } catch {
      response.status(400).json({ message: "Invalid budget evolution data" });
    }
  },
);

// Get budget evolution by username for a specific month using dateBudget.
budgetEvolutionRouter.get(
  "/api/budget-evolution/:username",
  async (request, response) => {
    const month = request.query.month;
    if (
      typeof month !== "string" ||
      !/^\d{4}-(0[1-9]|1[0-2])$/.test(month)
    ) {
      response
        .status(400)
        .json({ message: "A valid month (YYYY-MM) is required" });
      return;
    }

    const startOfMonth = new Date(`${month}-01T00:00:00.000Z`);
    const startOfNextMonth = new Date(startOfMonth);
    startOfNextMonth.setUTCMonth(startOfNextMonth.getUTCMonth() + 1);

    const username = request.params.username;
    const budgetEvolution = await EvolutionBudgetCategory.find({
      username,
      dateBudget: { $gte: startOfMonth, $lt: startOfNextMonth },
    });
    response.json(budgetEvolution);
  },
);

export default budgetEvolutionRouter;
