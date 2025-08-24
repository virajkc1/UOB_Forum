import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import QuestionList from "../components/QuestionList";
import api from "../lib/api";
import { Link } from "react-router-dom";

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

const MainForumPage = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      fetchAllQuestions();
    }
  }, [isAuthenticated]);

  const fetchAllQuestions = async () => {
    try {
      setIsLoadingQuestions(true);
      const response = await api.get("/question/all");
      if (response.status === 200) {
        // Sort by most recent first
        const sortedQuestions = response.data.sort(
          (a: Question, b: Question) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setAllQuestions(sortedQuestions);
      }
    } catch (error: any) {
      setError("Failed to fetch all questions");
      console.error("Error fetching all questions:", error);
    } finally {
      setIsLoadingQuestions(false);
    }
  };

  const handleLogout = async () => {
    await logout();
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
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600">Please log in to access the forum.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link
                to="/forum"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                ← Back to Dashboard
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Main Forum</h1>
                <p className="text-gray-600">All community questions</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Welcome, {user?.name}!</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Questions List */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            All Community Questions
          </h2>
          <QuestionList
            questions={allQuestions}
            isLoading={isLoadingQuestions}
          />
        </div>
      </div>
    </div>
  );
};

export default MainForumPage;
