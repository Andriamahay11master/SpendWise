import mongoose from "mongoose";

const evolutionBudgetCategorySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    icon: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    budgetCurrent: {
      type: Number,
      required: true,
      min: 0,
      max: 10000,
    },
    budgetMax: {
      type: Number,
      required: true,
      min: 0,
      max: 10000,
    },
    username: {
      type: String,
      required: true,
    },
    dateBudget: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model(
  "EvolutionBudgetCategory",
  evolutionBudgetCategorySchema,
);
