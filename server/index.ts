import "dotenv/config";
import cors from "cors";
import express from "express";
import { fileURLToPath } from "node:url";
import mongoose from "mongoose";
import budgetRoutes from "./routes/budgetRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import expenseRoutes from "./routes/expenseRoutes";
import userRoutes from "./routes/userRoutes";
import uploadRouter from "./routes/uploadFile";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(
  "/uploads",
  express.static(fileURLToPath(new URL("../src/assets/", import.meta.url))),
);

app.use(budgetRoutes);
app.use(categoryRoutes);
app.use(expenseRoutes);
app.use(userRoutes);
app.use(uploadRouter);

mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => {
    app.listen(port, () => {
      console.log(`API running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  });
