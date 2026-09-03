import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    notes: {
      type: String,
      default: "",
      trim: true,
    },
    currency: {
      type: String,
      required: true,
      default: "$",
    },
    colorCategory: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const Expense = mongoose.model("Expense", expenseSchema);
