import React from "react";

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

interface QuestionListProps {
  questions: Question[];
  isLoading: boolean;
}

const QuestionList: React.FC<QuestionListProps> = ({
  questions,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading questions...</span>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-400 text-6xl mb-4">❓</div>
        <h3 className="text-xl font-medium text-gray-600 mb-2">
          No questions yet
        </h3>
        <p className="text-gray-500">Be the first to ask a question!</p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-4">
      {questions.map((question) => (
        <div
          key={question._id}
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 cursor-pointer">
              {question.title}
            </h3>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>{formatDate(question.createdAt)}</span>
            </div>
          </div>

          <p className="text-gray-700 mb-4 line-clamp-3">{question.content}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>By {question.author.name}</span>
              <span>•</span>
              <span>{question.votes} votes</span>
              <span>•</span>
              <span>{question.answers.length} answers</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {question.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuestionList;
