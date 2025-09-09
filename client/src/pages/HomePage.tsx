import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import HomePage_1 from "../assets/homepage_icons/homepage_stack1.png";
import HomePage_2 from "../assets/homepage_icons/homepage_stack2.png";
import HomePage_3 from "../assets/homepage_icons/homepage_stack3.png";

const HomePage = () => {
  const { scrollY } = useScroll();

  // Central text animation
  // const textOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  // const textY = useTransform(scrollY, [0, 10], [0, -50]);

  // Top boxes move slower, subtle rotation

  const yLeftTop = useTransform(scrollY, [0, 800], [0, -200]);

  const yLeftBottom = useTransform(scrollY, [0, 800], [0, 200]);

  return (
    <div className=" bg-white">
      {/* Top Navigation Bar */}
      {/* <div> */}
      <nav className=" bg-white  top-0 border-b-2 border-gray-200 w-full">
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
                <span className="text-xl font-medium text-black">Unisun</span>
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
      <section className=" min-h-[220vh] bg-cover bg-center gradient-vertical bg-white text-black relative">
        <div className="sticky top-0 z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <h1 className="text-7xl pt-10 font-normal leading-tight text-black">
            <span className=" block text-left  ml-40">Build a future</span>

            <span className="block text-right green-primary-text mb-5 mr-40">
              ... in Unisun
            </span>
          </h1>
          <div className="max-w-screen-sm mx-auto">
            <p className="text-lg text-gray-700 leading-relaxed text-center mb-5  ">
              A community of university students and alumni in your field to
              help you out!
            </p>
          </div>

          <div className="flex justify-center">
            <Link
              to="/signup"
              className="btn-primary-color px-6 py-3 rounded-lg text-center whitespace-nowrap  hover:scale-105 hover:shadow-xl"
            >
              Join the Community
            </Link>
          </div>
        </div>
        <motion.div
          className="absolute top-[30%] left-[5%] w-[450px] z-10 h-[300px] bg-red-500 rounded-lg"
          style={{
            y: yLeftTop,
            willChange: "transform",
            backgroundImage: `url(${HomePage_3})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></motion.div>
        <motion.div
          className="absolute top-[40%] left-[15%] w-[450px] h-[300px] rounded-lg overflow-hidden z-20 "
          style={{
            y: yLeftBottom,
            willChange: "transform",
            backgroundImage: `url(${HomePage_2})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></motion.div>
        <motion.div
          className="absolute top-[25%] right-[5%] w-[450px] z-10 h-[300px] bg-red-500 rounded-lg"
          style={{
            y: yLeftBottom,
            willChange: "transform",
            backgroundImage: `url(${HomePage_1})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></motion.div>
      </section>
      {/* </div>

      {/* Features Section */}
      <section className="mt-10 pt-16 bg-white border-t-2 border-gray-100">
        <div className="flex justify-center items-center flex-col gap-4">
          <div>
            <h1>Features</h1>
          </div>
          <div className="flex justify-between gap-10">
            <div>
              <h2>ger</h2>
            </div>
            <div>
              <h2>ger</h2>
            </div>
            <div>
              <h2>ger</h2>
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
      <section className="py-20 bg-[#97e9ff]">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 ">
          <div className=" rounded-2xl p-8 pl-6">
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
          {/* <div>
            <div className="w-[600px] ml-5 bg-white min-h-[300px] rounded-xl">
              hello
            </div>
          </div> */}
        </div>
      </section>
      <footer className="py-16 light-green-colour">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 items-center"></div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
