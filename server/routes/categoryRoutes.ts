import { Router } from "express";
import { Category } from "../models/Category";

const categoryRouter = Router();

categoryRouter.get("/api/categories", async (_request, response) => {
  const categories = await Category.find();
  response.json(categories);
});

categoryRouter.get("/api/categories/:name/color", async (request, response) => {
  const category = await Category.findOne({ name: request.params.name });

  if (category) {
    response.json({ color: category.color });
    return;
  }

  response.status(404).json({ message: "Category not found" });
});

categoryRouter.post("/api/categories", async (request, response) => {
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

categoryRouter.get("/api/categories/:name/budgetCurrent", async (request, response) => {
  try {
    const category = await Category.findOne({ name: request.params.name });

    if (category) {
      response.json({ budgetCurrent: category.budgetCurrent });
      return;
    }

    response.status(404).json({ message: "Category not found" });
  } catch {
    response.status(400).json({ message: "Invalid budget data" });
  }
});

categoryRouter.put("/api/categories/:name/budgetCurrent", async (request, response) => {
  try {
    const { budgetCurrent } = request.body;
    const category = await Category.findOneAndUpdate(
      { name: request.params.name },
      { budgetCurrent },
      { new: true },
    );

    if (category) {
      response.json(category);
      return;
    }

    response.status(404).json({ message: "Category not found" });
  } catch {
    response.status(400).json({ message: "Invalid budget data" });
  }
});

categoryRouter.delete("/api/categories/:id", async (request, response) => {
  await Category.findByIdAndDelete(request.params.id);
  response.status(204).send();
});

export default categoryRouter;
