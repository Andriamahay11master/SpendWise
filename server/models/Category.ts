import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
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
    budget: {
      type: Number,
      required: true,
      min: 0,
      max: 10000,
    },
  },
  { timestamps: true },
);

export const Category = mongoose.model("Category", categorySchema);
