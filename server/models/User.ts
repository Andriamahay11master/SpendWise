import mongoose from "mongoose";
import bcrypt from "bcrypt";

interface UserMethods {
  comparePassword(userPassword: string): Promise<boolean>;
}

interface UserDocument {
  username: string;
  email: string;
  password: string;
  role: "user" | "admin";
  active: boolean;
  createdAt: Date;
}

const userSchema = new mongoose.Schema<
  UserDocument,
  mongoose.Model<UserDocument, {}, UserMethods>,
  UserMethods
>({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  role: {
    type: String,
    required: true,
    enum: ["user", "admin"],
    default: "user",
  },
  active: {
    type: Boolean,
    required: true,
    default: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

// Middleware: Hash password before saving to the database
userSchema.pre("save", async function () {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) return;

  // Generate a salt and hash the password (cost factor of 12 is highly secure)
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

// Verify plain text password against the hashed database password
userSchema.methods.comparePassword = async function (userPassword: string) {
  return bcrypt.compare(userPassword, this.password);
};

export const User = mongoose.model("User", userSchema);
