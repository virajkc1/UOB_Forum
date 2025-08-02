import { Request } from "express";

// Extend Request interface to include user data from authentication
export interface AuthRequest extends Request {
  user?: any; // User data added by auth middleware
}

// You can add more shared types here as needed
export interface CreateQuestionBody {
  title: string;
  content: string;
  tags?: string[];
}

export interface UpdateQuestionBody {
  title?: string;
  content?: string;
  tags?: string[];
}
