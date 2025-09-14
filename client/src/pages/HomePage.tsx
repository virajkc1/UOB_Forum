import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import HomePage_1 from "../assets/homepage_icons/homepage_stack1.png";
import HomePage_2 from "../assets/homepage_icons/homepage_stack2.png";
import HomePage_3 from "../assets/homepage_icons/homepage_stack3.png";
import { Menu, X } from "lucide-react";
import { Instagram, Twitter, Linkedin } from "lucide-react";
import { useState } from "react";
import Logo from "../assets/homepage_icons/unisun_logo.png";

const HomePage = () => {
  const { scrollY } = useScroll();
  const [isOpen, setIsOpen] = useState(false);

  // Central text animation
  // const textOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  // const textY = useTransform(scrollY, [0, 10], [0, -50]);

  // Top boxes move slower, subtle rotation

  const yLeftTop = useTransform(scrollY, [0, 800], [0, -200]);

  const yLeftBottom = useTransform(scrollY, [0, 800], [0, 200]);

  return (
    <div className=" bg-white">
      {/* Top Navigation Bar */}
      <nav className=" bg-white top-0 border-b-2 border-gray-200 w-full">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Brand */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-14 h-14  rounded-lg flex items-center justify-center">
                  <div className=" bg-white rounded-lg flex items-center justify-center">
                    <img src={Logo} alt="Logo" />
                  </div>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="flex items-center md:space-x-2 lg:space-x-8">
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
            <div className="hidden md:flex items-center space-x-4">
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
            {/* Hamburger Button (Mobile only) */}
            <button
              className="md:hidden text-gray-800"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden bg-white border-t-gray-200">
            <div className="px-4 py-4 space-y-4">
              <Link
                to="/forums"
                className="block text-center border-red-100 text-gray-700 hover:text-black"
              >
                Forums
              </Link>
              <Link
                to="/topics"
                className="block text-center text-gray-700 hover:text-black"
              >
                Topics
              </Link>
              <Link
                to="/resources"
                className="block text-center text-gray-700 hover:text-black"
              >
                Resources
              </Link>
              <Link
                to="/about"
                className="block text-center text-gray-700 hover:text-black"
              >
                About
              </Link>
            </div>
          </div>
        )}
      </nav>
      <section className=" md:min-h-[220vh] max-w-screen bg-cover bg-center gradient-vertical bg-white text-black relative">
        <div className="sticky top-0 z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <h1 className="text-5xl md:text-7xl pt-10 font-normal leading-tight text-black">
            <span className=" block md:text-left  md:ml-40">
              Build a future
            </span>

            <span className="block text-right green-primary-text mb-10 md:mb-5  md:mr-40">
              ... in Unisun
            </span>
          </h1>
          <div className="max-w-screen-sm mx-auto">
            <p className="text-lg text-gray-700 leading-relaxed text-center mb-5  ">
              A community of university students and alumni in your field to
              help you out!
            </p>
          </div>

          <div className="flex justify-center w-full">
            <Link
              to="/signup"
              className="btn-primary-color px-48 md:px-8 py-4 rounded-lg text-center whitespace-nowrap  hover:scale-105 hover:shadow-xl"
            >
              Join the Community
            </Link>
          </div>
        </div>
        <motion.div
          className="absolute top-[30%] left-[5%] w-0 md:w-[450px] z-10 h-[200px] md:h-[300px] max-w-7xl mx-auto rounded-lg"
          style={{
            y: yLeftTop,
            willChange: "transform",
            backgroundImage: `url(${HomePage_3})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></motion.div>
        <motion.div
          className="absolute top-[40%] left-[15%] w-0 md:w-[450px] h-[200px] md:h-[300px] rounded-lg overflow-hidden z-20 "
          style={{
            y: yLeftBottom,
            willChange: "transform",
            backgroundImage: `url(${HomePage_2})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></motion.div>
        <motion.div
          className="absolute top-[25%] right-[5%] w-0 md:w-[450px] md:h-[300px] z-10  rounded-lg"
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
      <section className="mx-auto pt-16 pb-16 bg-white border-t-2 border-gray-100">
        <div>
          <div className="h-[120px]">
            <h1 className="font-bold text-3xl green-primary-text text-center">
              HOW UNISUN WORKS
            </h1>
          </div>
        </div>
        <div className="flex max-w-7xl justify-center items-center flex-col mx-auto gap-10 mb-10 px-16 ">
          {/* Wrapping container */}
          <div className="flex flex-col md:flex-row justify-center md:justify-between items-center md:items-stretch gap-16 w-full">
            {/* Card 1 */}
            <div className="w-[85%] md:w-[350px] h-[200px] md:min-h-[300px] flex flex-col justify-center items-center tile-background rounded-3xl shadow-xl hover:shadow-2xl hover:scale-105 duration-300">
              <h2 className="text-white text-xl md:text-2xl font-bold mb-8 md:mb-10">
                Create an Account
              </h2>
              <p className="text-gray-50 text-center px-6">
                Sign up with your university info and join the community
              </p>
            </div>

            {/* Card 2 */}
            <div className="w-[85%] md:w-[350px] h-[200px] md:min-h-[300px] flex flex-col justify-center items-center tile-background rounded-3xl shadow-xl hover:shadow-2xl hover:scale-105 duration-300">
              <h2 className="text-white text-xl md:text-2xl font-bold mb-8 md:mb-10">
                Ask Quetions
              </h2>
              <p className="text-gray-50 text-center px-6">
                Ask questions to the community and get answers
              </p>
            </div>

            {/* Card 3 */}
            <div className="w-[85%] h-[200px] md:w-[350px] md:min-h-[300px] flex flex-col justify-center items-center tile-background rounded-3xl shadow-xl hover:shadow-2xl hover:scale-105 duration-300">
              <h2 className="text-white text-xl md:text-2xl font-bold mb-8 md:mb-10">
                Help Others
              </h2>
              <p className="text-gray-50 text-center px-6">
                Help others by answering questions and get rewarded
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Call to Action */}
      <section className="p-20 border-t-2 border-gray-200 bg-[#97e9ff] ">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 grid  bg-[#97e9ff] rounded-2xl">
          <div className=" flex flex-col  rounded-2xl p-8 pl-6">
            <h2 className="text-3xl font-bold text-black mb-4 items-center">
              Have a Question?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Any questions about the platform or if you are looking to join the
              team, please speak to us!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center px-8 py-4 tile-background text-white font-semibold rounded-lg hover:bg-[#e64500] transition-colors"
              >
                Contact Us!
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
      <footer className="bg-white h-full  max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 border-t-2">
        <div className="items-center flex flex-col">
          <div className="flex flex-row justify-between mt-10 w-full gap-4">
            <div className=" rounded-lg flex items-center justify-center">
              <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center">
                <div className="w-14 h-14  rounded-lg flex items-center justify-center">
                  <div className=" bg-white rounded-lg flex items-center justify-center">
                    <img src={Logo} alt="Logo" />
                  </div>
                </div>{" "}
              </div>
            </div>

            <div className="flex flex-row gap-10 ">
              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram />
              </a>

              <a
                href="https://linkedin.com/in/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin />
              </a>

              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter />
              </a>
            </div>
          </div>
          <div className="text-center text-gray-500 text-xs m-2">
            <p className="m-3">
              Unisun is not affiliated to or endorsed by any school, college or
              university.
            </p>
            <p>Copyright © 2025</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
