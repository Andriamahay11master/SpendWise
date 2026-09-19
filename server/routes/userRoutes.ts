import { Router } from "express";
import { User } from "../models/User";

const expenseRouter = Router();

// create user
expenseRouter.post("/api/user", async (request, response) => {
  try {
    const { username, email, password, role, active } = request.body;

    const userData = await User.create({
      username,
      email,
      password,
      role,
      active,
    });

    response.status(201).json(userData);
  } catch {
    response.status(400).json({ message: "Invalid user data" });
  }
});

// login with username and password
expenseRouter.post("/api/login", async (request, response) => {
  try {
    const { username, password } = request.body;
    const user = await User.findOne({ username }).select("+password");
    if (!user) {
      response.status(401).json({ message: "Invalid username or password" });
      return;
    }
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      response.status(401).json({ message: "Invalid username or password" });
      return;
    }
    return response.json(user);
  } catch {
    response.status(400).json({ message: "Invalid user data" });
  }
});

// get user by id
expenseRouter.get("/api/user/:id", async (request, response) => {
  const user = await User.findById(request.params.id);
  response.json(user);
});

// update user
expenseRouter.put("/api/user/:id", async (request, response) => {
  try {
    const { username, email, password } = request.body;
    const user = await User.findByIdAndUpdate(
      request.params.id,
      { username, email, password },
      { new: true },
    );
    response.json(user);
  } catch {
    response.status(400).json({ message: "Invalid user data" });
  }
});

// forget password
expenseRouter.post("/api/user/forget-password", async (request, response) => {
  try {
    const { email } = request.body;
    const user = await User.findOne({ email });
    if (!user) {
      response.status(404).json({ message: "User not found" });
      return;
    }
    response.json(user);
  } catch {
    response.status(400).json({ message: "Invalid user data" });
  }
});

export default expenseRouter;
