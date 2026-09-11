import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema(
  {
    currency: {
      type: String,
      required: true,
      default: "$",
    },
    budget: {
      type: Number,
      required: true,
      min: 100,
      default: 100,
    },
  },

  { timestamps: true },
);
export const Category = mongoose.model("Budget", budgetSchema);
