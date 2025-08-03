import { Request } from "express";

// Extend Request interface to include user data from authentication
export interface AuthRequest extends Request {
  user?: any; // User data added by auth middleware
}

// You can add more shared types here as needed
