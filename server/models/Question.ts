import { Schema, model } from "mongoose";

const questionSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  votes: { type: Number, required: true },
});
