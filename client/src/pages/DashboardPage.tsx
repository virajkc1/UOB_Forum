import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import QuestionForm from "../components/QuestionForm";
import QuestionList from "../components/QuestionList";
import api from "../lib/api";
import { Link, Navigate } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";

interface Question {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  author: { name: string };
  votes: number;
  answers: any[];
}

const DashboardPage = () => {
  const { isAuthenticated, isLoading, logout } = useAuth();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      fetchQuestions();
    }
  }, [isAuthenticated]);

  const fetchQuestions = async () => {
    try {
      setIsLoadingQuestions(true);
      const response = await api.get("/question/user"); // Get only user's questions
      if (response.status === 200) {
        setQuestions(response.data);
      }
    } catch (error: any) {
      setError("Failed to fetch your questions");
      console.error("Error fetching your questions:", error);
    } finally {
      setIsLoadingQuestions(false);
    }
  };

  const handleQuestionCreated = (newQuestion: Question) => {
    setQuestions((prevQuestions) => [newQuestion, ...prevQuestions]);
  };

  const handleLogout = async () => {
    await logout();
    // Redirect will be handled by the auth context
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Fixed Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b h-16">
        <NavigationMenu className="flex justify-center items-center min-w-full h-full">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Button variant="outline">Logo</Button>
            </NavigationMenuItem>
          </NavigationMenuList>

          <Input placeholder="Search" className="max-w-sm" />
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </NavigationMenu>
      </header>

      {/* Main Content Area with Sidebar */}
      <div className="pt-16">
        <SidebarProvider>
          <AppSidebar />
          <main className="flex-1 w-full">
            <SidebarTrigger className="m-4" />

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                  {error}
                </div>
              )}

              {/* Question Form */}
              <QuestionForm onQuestionCreated={handleQuestionCreated} />

              {/* Main Forum Link */}
              <div className="flex justify-end mb-6">
                <Link
                  to="/main-forum"
                  className="px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  View Main Forum
                </Link>
              </div>

              {/* Questions List */}
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Your Questions
                </h2>
                <QuestionList
                  questions={questions}
                  isLoading={isLoadingQuestions}
                />
              </div>
            </div>
          </main>
        </SidebarProvider>
      </div>
    </div>
  );
};

export default DashboardPage;
