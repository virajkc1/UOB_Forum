import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "student"],
      default: "student",
      required: false,
    },
    year: {
      type: String,
      required: true,
    },
    verified: { type: Boolean, default: false },
    verificationCode: { type: String },
    verificationExpires: { type: Date },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;
