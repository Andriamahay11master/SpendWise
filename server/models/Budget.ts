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
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    libelle: {
      type: String,
      required: true,
      default: "Budget" + " " + new Date().toLocaleString(), // eg: Budget September 2026
    },
  },

  { timestamps: true },
);
export const Budget = mongoose.model("Budget", budgetSchema);
