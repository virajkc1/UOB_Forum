import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import { useAuth } from "../contexts/AuthContext";
import QuestionForm from "../components/QuestionForm";
import QuestionList from "../components/QuestionList";
import api from "../lib/api";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import * as Dialog from "@radix-ui/react-dialog"; //namespace import -
import { X } from "lucide-react";
import QuestionCard from "../components/dashboard_ui/QuestionCard";
import CreateQuestionDialog from "@/components/dashboard_ui/CreateQuestionDialog";
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
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
  });

  const navigate = useNavigate();
  /* 
  Web Hook into components - can switch route w/o reloading browser
  Pros - App is fast, no full reload wont lose app state eg: form / data / scroll position
  */

  //Temp Data until Async is implemented
  const mockQuestions = [
    {
      _id: "1",
      title: "Why did my answer give 3,121 for PDA?",
      content: "I think I messed up the integral when...",
      author: { name: "Viraj Chapaneri" },
      createdAt: "5 months ago",
      module: "Year 3",
      attachments: [],
    },
    // add more mocks here
    {
      _id: "1",
      title: "Why did my answer give 3,121 for PDA?",
      content: "I think I messed up the integral when...",
      author: { name: "Viraj Chapaneri" },
      createdAt: "5 months ago",
      module: "Year 3",
      attachments: [],
    },
    {
      _id: "1",
      title: "Why did my answer give 3,121 for PDA?",
      content: "I think I messed up the integral when...",
      author: { name: "Viraj Chapaneri" },
      createdAt: "5 months ago",
      module: "Year 3",
      attachments: [],
    },
  ];

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    //state settler function
    //checks if their is a change or not
    //prevent default behaviour
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      //dynamic key hence [] needed
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isSubmitting) {
      setIsSubmitting(true);
    }
    try {
      const response = await api.post("/question", formData);
      //endpoint you are sending api call to so its a post api request, so we are sending data to this API post, formData is the data we are submtting
      setIsSubmitting(false);
      console.log(response);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchQuestions();
    }
  }, [isAuthenticated]);

  const fetchQuestions = async () => {
    setIsLoadingQuestions(true);
    setError("");
    try {
      const { data } = await api.get("/question/all"); // Get the data from the API
      //Destructure the data from the API
      setQuestions(data);
      console.log(data);
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
    <div className="min-h-screen min-w-full flex flex-col bg-gray-50">
      {/* Splitting the main wrapper into 2 div blocks */}
      {/* Top Navigation */}
      {/* Main Body */}

      {/* Header - Fixed Navbar - Logo, Searchbar, Logout & Avator */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b h-16">
        <NavigationMenu
          value="test"
          className="flex justify-between items-center min-w-full h-full mx-auto"
        >
          <NavigationMenuList>
            <NavigationMenuItem className="ml-10">
              <Button variant="outline">Logo</Button>
            </NavigationMenuItem>
          </NavigationMenuList>

          <Input placeholder="Search" className="max-w-sm" />
          <div className="flex gap-5">
            <Button variant="outline" onClick={handleLogout} className="">
              Logout
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/profile")}
              className="mr-10"
            >
              Profile
            </Button>
          </div>
        </NavigationMenu>
      </header>

      {/* Main Content Area with Sidebar */}
      {/* Sidebar - Navigation Menu

      1. Home - Home Page
      2. Collections - Collections Page
      3. Profile - Profile Page
      4. People - People Page
      5. Help - Help Page


      */}
      <div className="flex flex-1 pt-16">
        <aside className="w-52 fixed top-16 left-0 h-[calc(100vh-4rem)] border-r bg-white border-gray-300">
          {/* fixed-keeps same position, top-16 - gap from main bar
          height and width is fixed height calculated 
          */}
          <nav className="flex flex-col p-4 h-full">
            <div className="gap-5 flex flex-col">
              <Button
                variant="ghost"
                className="justify-start min-w-full"
                onClick={() => navigate("/")}
              >
                Home
              </Button>
              <Button
                variant="ghost"
                className="justify-start min-w-full hover:bg-gray-100"
                onClick={() => navigate("/collections")}
              >
                Collections
              </Button>
              <Button
                variant="ghost"
                className="justify-start hover:bg-gray-100"
                onClick={() => navigate("/profile")}
              >
                My Profile
              </Button>
              <Button
                variant="ghost"
                className="justify-start hover:bg-gray-100"
                onClick={() => navigate("/people")}
              >
                People
              </Button>
            </div>
            <div className="mt-auto">
              <Button
                variant="ghost"
                className="mt-auto justify-start hover:bg-gray-100 min-w-full mb-5"
                onClick={() => navigate("/help")}
              >
                Help
              </Button>
            </div>
          </nav>
        </aside>
        <main className="flex-1 overflow-auto px-8 py-6 ml-52 min-h-screen">
          {/* Filter / Sort by features
          
          This is just testing purposes right now for layout
          Maps over each element in the array
          Creates span element 
          
          */}
          <div className="flex flex-col gap-2 border-b border-gray-300 pb-2 mb-6">
            <div></div>
            <h1 className="text-xl font-bold">University of Birmingham</h1>
            <h2 className="text-md text-gray-700 font-medium">
              Chemical Engineering
            </h2>
          </div>
          <div className="flex justify-between items-center mb-6">
            <Button variant="outline">Filter/Sort by</Button>
            <CreateQuestionDialog />
          </div>
          {/* This creates the Question Card 
          
          Needs to go through the database
          Finds each question in chronological order
          Finds the parameters - async needed

          
          */}
          <div className="justify-between w-full max-w-4xl flex-1 mx-auto px-8 py-6 gap-10 flex flex-col">
            {questions.map((question) => (
              <QuestionCard key={question._id} {...question} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
