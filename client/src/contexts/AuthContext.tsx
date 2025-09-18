import { createContext, useContext, useState, useEffect } from "react";
//createContext is a function
// useContext, useState & useEffect are React web hooks

//useEffect - when you need to use something outside of the react environment

//createContext - creates a Context object, sharing data or state without passing props manually

//useContext - lets you use a value from the Context object

import type { ReactNode } from "react"; //used to define any type of react code

import api from "../lib/api"; //this is the axios instance default

//this defines the User Schema
interface User {
  _id: string;
  name: string;
  email: string;
  year: string;
  role: string;
}
//defines the type for the AuthContext
interface AuthContextType {
  user: User | null; //user has the above info
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>; //takes an email and password as inputs but a promise is returned with no value ("hence its void")
  logout: () => Promise<void>; //no inputs needed, it just logs out
  checkAuth: () => Promise<void>; //not inputs, returns a Promise with no value eg: likely to be a change in state or API call
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
//the AuthContext is a variable storing the info thats passed down to all components, its type is either AuthContextType or its undefined, by default its undefined

//defining our custom web hook
export const useAuth = () => {
  const context = useContext(AuthContext); //defines a variable, that we will use the AuthContext
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider"); //means AuthContext wasnt correctly configured
  }
  return context; //return the context
};

//type definition used for Props
interface AuthProviderProps {
  children: ReactNode; //the props can have any child component
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const response = await api.get("/auth/verify");
      if (response.status === 200) {
        setUser(response.data.user);
        setIsAuthenticated(true);
      }
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      if (response.status === 200) {
        // Cookie is automatically set by backend
        await checkAuth(); // Verify the user is authenticated
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout"); //must clear the cookie and user session when logging out then navigate to home page

      setUser(null); //clears the user
      setIsAuthenticated(false); //user not authenticated
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
