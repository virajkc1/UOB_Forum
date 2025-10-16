import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
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
import * as Dialog from "@radix-ui/react-dialog"; //namespace import -
import { X } from "lucide-react";
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
          <Button variant="outline" onClick={handleLogout} className="mr-10">
            Logout
          </Button>
        </NavigationMenu>
      </header>

      {/* Main Content Area with Sidebar */}
      <div className="pt-16">
        <SidebarProvider>
          <AppSidebar />
          <main className="max-h-screen">
            <SidebarTrigger
              className="m-4 [&[data-disabled=true]_svg]:hidden"
              disabled
            />

            {/* Main Content */}
            {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                  {error}
                </div>
              )}

              {/* Question Form */}
            {/* <QuestionForm onQuestionCreated={handleQuestionCreated} /> */}

            {/* Main Forum Link */}
            {/* <div className="flex justify-end mb-6">
                <Link
                  to="/main-forum"
                  className="px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  View Main Forum
                </Link>
              </div> */}

            {/* Questions List */}
            {/* <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Your Questions
                </h2>
                <QuestionList
                  questions={questions}
                  isLoading={isLoadingQuestions}
                />
              </div> */}
            {/* </div>  */}
            <Dialog.Root>
              {/* The root is the wrapper for the dialog ONLY */}

              <Dialog.Trigger asChild>
                {/* The trigger is the button of the dialog */}
                <div className="flex min-w-full mx-auto justify-end">
                  <Button className="bg-white border-2 hover:shadow-md p-5 rounded-xl text-black">
                    Create a Question
                  </Button>
                </div>
              </Dialog.Trigger>
              {/* The trigger is the button of the dialog */}
              <Dialog.Portal>
                {/* Sends dialog cotnent to end of the body (so everything in the body is behind when clicked) */}
                <Dialog.Overlay
                  className="inset-0 fixed bg-gray-400 opacity-50"
                  onClick={() => setIsOpen(false)}
                />
                {/* This is the dark background at the back  */}
                <Dialog.Content className="fixed left-1/2 top-[20%] rounded-xl shadow-md -translate-1/2 tran w-[400px] bg-white  min-h-[500px]">
                  <div>
                    <div className="flex pr-8 pt-5 max-w-full flex-row justify-end"></div>
                    <div>
                      <form
                        onSubmit={handleSubmit}
                        className="w-[80%] mx-auto mt-3 justify-center"
                      >
                        <div className="flex justify-center flex-row">
                          <h3 className="font-semibold text-2xl">
                            Post a Question
                          </h3>
                        </div>

                        <h3 className="font-normal pt-3">Title</h3>
                        <input
                          className="bg-white min-w-full border-2 rounded-md pt-1 px-3"
                          id="title"
                          name="title"
                          type="text"
                          onChange={handleChange}
                          value={formData.title}
                          autoFocus
                          placeholder="Enter your question title..."
                        />
                        <h3 className="font-normal pt-3">Body</h3>
                        <textarea
                          className="bg-white min-w-full border-2 rounded-md pt-1 px-3 pb-20 resize-none"
                          id="content"
                          name="content"
                          rows={6}
                          onChange={handleChange}
                          value={formData.content}
                        />
                        <div className="justify-end pt-10 gap-10 flex ">
                          <button className="bg-white border-2 hover:shadow-md p-5  rounded-xl">
                            <p>Cancel</p>
                          </button>
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-blue-600  p-5 rounded-xl hover:shadow-md"
                          >
                            <p className="text-white">Submit</p>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <Dialog.Close>
                    <X className="h-6 w-6 absolute top-4 right-4" />
                  </Dialog.Close>

                  {/* This is the actual box that pops up on click */}
                  <Dialog.Title />
                  {/* Main title for accessiblity */}
                  <Dialog.Description />
                  {/* Extra info too for screen readers */}
                  <Dialog.Close />
                  {/* the button to close the dialog */}
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </main>
        </SidebarProvider>
      </div>
    </div>
  );
};

export default DashboardPage;
