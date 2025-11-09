//typescript interface for the question card
//the values that are passed in to the question card
type QuestionCardProps = {
  title: string;
  content: string;
  author: { name?: string } | null;
  createdAt: string;
  tags?: string[];
  attachments?: string[];
};

//React Functional Component - With Props from QuestionCardProps
//Destructuring the props from the QuestionCardProps
const QuestionCard: React.FC<QuestionCardProps> = ({
  title,
  content,
  author,
  createdAt,
  tags,
  attachments = [], //default empty array if no attachments
}) => {
  return (
    <article>
      <header>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            <div>
              <h3 className="font-medium text-gray-900">
                {author?.name || "Unknown"}
              </h3>
              <p className="text-sm text-gray-500">{createdAt}</p>
            </div>
          </div>
          <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            Year 3
          </div>
        </div>
      </header>
      <main>
        <div className="bg-blue-500 rounded-xl min-w-full shadow-sm border p-6">
          {/* Question Content */}
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-900 mb-2">{title}</h2>
            <p className="text-gray-700">{content}</p>
          </div>

          {/* Attachments Section */}
          <div className="flex space-x-2 mb-4">
            <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 bg-gray-400 rounded"></div>
            </div>
            <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 bg-gray-400 rounded"></div>
            </div>
            <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 bg-gray-400 rounded"></div>
            </div>
          </div>

          {/* Comment Input */}
          <div className="border-t pt-4">
            <input
              type="text"
              placeholder="What are your thoughts..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </main>
      <footer>
        {tags && tags.length > 0 && (
          <span className="text-sm text-gray-500">
            <span className="font-medium text-gray-900">{tags.join(", ")}</span>
          </span>
        )}
      </footer>
    </article>
  );
};

export default QuestionCard;
