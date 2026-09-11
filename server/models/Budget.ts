import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema(
  {
    currencyCode: {
      type: String,
      required: true,
      default: "USD",
    },
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
      default:
        "Budget" + " " + new Date().getMonth() + " " + new Date().getFullYear(), // eg: Budget September 2026
    },
  },

  { timestamps: true },
);
export const Budget = mongoose.model("Budget", budgetSchema);
