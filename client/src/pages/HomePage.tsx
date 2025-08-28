import { Link } from "react-router-dom";
import { ChevronRight, GraduationCap } from "lucide-react";
const HomePage = () => {
  return (
    <div className=" bg-white">
      {/* Top Navigation Bar */}
      <div>
        <nav
          className="fixed bg-white top-0 border-b-2 border-gray-200 w-full
      "
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo and Brand */}
              <div className="flex items-center">
                <Link to="/" className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                    <div className="w-6 h-6 bg-white rounded-lg flex items-center justify-center">
                      <span className="text-gray-900 font-bold text-lg">U</span>
                    </div>
                  </div>
                  <span className="text-xl font-bold green-primary-text">
                    Unisun
                  </span>
                </Link>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                <Link to="/forums" className="btn-secondary">
                  Forums
                </Link>
                <Link to="/topics" className="btn-secondary">
                  Topics
                </Link>
                <Link to="/resources" className="btn-secondary">
                  Resources
                </Link>
                <Link to="/about" className="btn-secondary">
                  About
                </Link>
              </div>

              {/* Right Side Actions */}
              <div className="flex items-center space-x-4">
                <div
                  className="hidden md:flex items-center space-x-4 border-2 border-gray-200 rounded-lg w-24 h-10 text-center justify-center hover:bg-gray-700 hover:text-white hover:border-none  duration-200 font-semibold text-gray-700 transform transition-all  ease-in-out 
            hover:scale-105 hover:shadow-xl"
                >
                  <Link to="/login">
                    <span className="text-center ">Login</span>
                  </Link>
                </div>
                <div
                  className="hidden md:flex items-center space-x-4 text-center justify-center btn-primary-color transform transition-all duration-300 ease-in-out 
            hover:scale-105 hover:shadow-xl w-24 h-10 whitespace-nowrap"
                >
                  <Link to="/signup">Sign up</Link>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="min-h-screen bg-cover bg-center gradient-vertical bg-white text-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="flex flex-col lg:grid-cols-2 gap-12 items-center h-96">
              <div className="mt-24">
                <h1 className="text-7xl pt-10 font-normal leading-tight text-center  text-black">
                  <span className="text-black block text-left -mb-12 ml-10">
                    Build a future
                  </span>
                  <br className="mt-0" />
                  <span className="text-black block text-right -mt-10 mr-12 green-primary-text">
                    ... in Unisun
                  </span>
                </h1>
                <div className="max-w-screen-sm mx-auto">
                  <p className="text-lg text-gray-700 mt-4 mb-8 leading-relaxed text-center ">
                    Be part of a community of students and alumni to help you
                    through your academic journey
                  </p>
                </div>
                <div className="flex justify-center">
                  <Link
                    to="/signup"
                    className="btn-primary-color inline-block px-6 py-3 rounded-lg text-center whitespace-nowrap w-auto hover:scale-105 hover:shadow-xl"
                  >
                    Join the Community
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-medium text-gray-900 mb-6">
                How it works
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Access free resources, connect with peers, and build your skills
                with real-world projects. Get support from the community and
                learn from experts in your field.
              </p>
              <Link
                to="/students"
                className="text-blue-600 hover:text-blue-800 font-semibold inline-flex items-center"
              >
                Learn more <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <div className="relative">
              <div className="w-full h-80 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-white/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <GraduationCap className="h-10 w-10 text-white/60" />
                  </div>
                  <p className="text-white/60">Student Resources</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"></div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Begin your ForumSite journey
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Join thousands of students and teachers who are already part of
              our community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Join ForumSite
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-gray-400 transition-colors"
              >
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
