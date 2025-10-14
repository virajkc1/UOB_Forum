import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Instagram, Twitter, Linkedin } from "lucide-react";
import { useState } from "react";
import Logo from "../assets/homepage_icons/unisun_logo.png";

export const AboutPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white min-h-screen">
      {/* Top Navigation Bar */}
      <nav className="bg-white top-0 border-b-2 border-gray-200 w-full">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Brand */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-14 h-14 rounded-lg flex items-center justify-center">
                  <div className="bg-white rounded-lg flex items-center justify-center">
                    <img src={Logo} alt="Logo" />
                  </div>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="flex items-center md:space-x-2 lg:space-x-8">
              <Link to="/about" className="btn-secondary bg-gray-100">
                About
              </Link>
              <Link to="/team" className="btn-secondary">
                Team
              </Link>
              <Link to="/contact" className="btn-secondary">
                Contact
              </Link>
            </div>

            {/* Right Side Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-4 border-2 border-gray-200 rounded-lg w-24 h-10 text-center justify-center hover:bg-gray-700 hover:text-white hover:border-none duration-200 font-semibold text-gray-700 transform transition-all ease-in-out hover:scale-105 hover:shadow-xl">
                <Link to="/login">
                  <span className="text-center">Login</span>
                </Link>
              </div>
              <div className="hidden md:flex items-center space-x-4 text-center justify-center btn-primary-color transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl w-24 h-10 whitespace-nowrap">
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
                to="/about"
                className="block text-center text-gray-700 hover:text-black"
              >
                About
              </Link>
              <Link
                to="/team"
                className="block text-center text-gray-700 hover:text-black"
              >
                Team
              </Link>
              <Link
                to="/contact"
                className="block text-center text-gray-700 hover:text-black"
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-normal leading-tight text-black mb-8"
          >
            <span className="block">Connecting University</span>
            <span className="block green-primary-text">Students & Alumni</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto mb-12"
          >
            Unisun is a community platform that bridges the gap between
            university students and alumni, creating meaningful connections and
            knowledge sharing opportunities across academic generations.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center"
          >
            <Link
              to="/signup"
              className="btn-primary-color px-8 py-4 rounded-lg text-center whitespace-nowrap hover:scale-105 hover:shadow-xl transform transition-all duration-300"
            >
              Join Our Community
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Our Mission & Vision
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Building bridges between academic generations to create a
              stronger, more connected university community.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Mission Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-[#FE592E] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-black mb-4">
                  Our Mission
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed text-center">
                To create a vibrant community where university students and
                alumni can connect, share knowledge, and support each other's
                academic and professional journeys. We believe in the power of
                mentorship, collaboration, and the transfer of wisdom across
                generations.
              </p>
            </motion.div>

            {/* Vision Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-[#8ECC8E] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-black mb-4">
                  Our Vision
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed text-center">
                To become the leading platform that transforms how university
                communities interact, making education more accessible through
                peer support and alumni guidance. We envision a world where
                every student has access to the wisdom and experience of those
                who came before them.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold green-primary-text mb-4">
              How Unisun Works
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Getting started is simple. Join thousands of students and alumni
              who are already building connections.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="w-full min-h-[300px] flex flex-col justify-center items-center tile-background rounded-3xl shadow-xl hover:shadow-2xl hover:scale-105 duration-300"
            >
              <div className="text-center px-6">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-[#FE592E]">1</span>
                </div>
                <h3 className="text-white text-xl md:text-2xl font-bold mb-4">
                  Create an Account
                </h3>
                <p className="text-gray-50 text-center">
                  Sign up with your university information and verify your
                  student or alumni status to join the community.
                </p>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="w-full min-h-[300px] flex flex-col justify-center items-center tile-background rounded-3xl shadow-xl hover:shadow-2xl hover:scale-105 duration-300"
            >
              <div className="text-center px-6">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-[#FE592E]">2</span>
                </div>
                <h3 className="text-white text-xl md:text-2xl font-bold mb-4">
                  Ask Questions
                </h3>
                <p className="text-gray-50 text-center">
                  Post questions about academics, career advice, or university
                  life and get answers from experienced alumni and peers.
                </p>
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="w-full min-h-[300px] flex flex-col justify-center items-center tile-background rounded-3xl shadow-xl hover:shadow-2xl hover:scale-105 duration-300"
            >
              <div className="text-center px-6">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-[#FE592E]">3</span>
                </div>
                <h3 className="text-white text-xl md:text-2xl font-bold mb-4">
                  Help Others
                </h3>
                <p className="text-gray-50 text-center">
                  Share your knowledge and experience by answering questions and
                  building meaningful connections within the community.
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              to="/signup"
              className="btn-primary-color px-8 py-4 rounded-lg text-center whitespace-nowrap hover:scale-105 hover:shadow-xl transform transition-all duration-300"
            >
              Get Started Today
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Community Impact Section */}
      <section className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Our Community Impact
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              See how Unisun is making a difference in the lives of students and
              alumni worldwide.
            </p>
          </motion.div>

          {/* Statistics Grid */}
          <div className="grid md:grid-cols-4 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center bg-white rounded-2xl p-6 shadow-lg"
            >
              <div className="text-4xl font-bold green-primary-text mb-2">
                500+
              </div>
              <div className="text-gray-600">Active Students</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center bg-white rounded-2xl p-6 shadow-lg"
            >
              <div className="text-4xl font-bold green-primary-text mb-2">
                200+
              </div>
              <div className="text-gray-600">Alumni Mentors</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center bg-white rounded-2xl p-6 shadow-lg"
            >
              <div className="text-4xl font-bold green-primary-text mb-2">
                1,500+
              </div>
              <div className="text-gray-600">Questions Answered</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center bg-white rounded-2xl p-6 shadow-lg"
            >
              <div className="text-4xl font-bold green-primary-text mb-2">
                50+
              </div>
              <div className="text-gray-600">Universities</div>
            </motion.div>
          </div>

          {/* Testimonials */}
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-[#FE592E] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">JS</span>
                </div>
                <h4 className="font-bold text-black">Jessica Smith</h4>
                <p className="text-gray-600 text-sm">
                  Computer Science Student
                </p>
              </div>
              <p className="text-gray-700 italic">
                "Unisun helped me connect with alumni who guided me through my
                final year project. The mentorship I received was invaluable!"
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-[#8ECC8E] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">MD</span>
                </div>
                <h4 className="font-bold text-black">Michael Davis</h4>
                <p className="text-gray-600 text-sm">
                  Software Engineer, Alumni
                </p>
              </div>
              <p className="text-gray-700 italic">
                "Giving back to students through Unisun has been incredibly
                rewarding. I love sharing my industry experience and helping the
                next generation succeed."
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-[#FE592E] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">AL</span>
                </div>
                <h4 className="font-bold text-black">Alex Lee</h4>
                <p className="text-gray-600 text-sm">Business Student</p>
              </div>
              <p className="text-gray-700 italic">
                "The career advice I got from alumni on Unisun helped me land my
                dream internship. This platform truly bridges the gap between
                students and professionals."
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-[#97e9ff] py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-[#97e9ff] rounded-2xl p-8"
          >
            <h2 className="text-3xl font-bold text-black mb-4">
              Ready to Join Our Community?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Connect with students and alumni from universities worldwide.
              Start your journey of knowledge sharing and mentorship today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center px-8 py-4 tile-background text-white font-semibold rounded-lg hover:bg-[#e64500] transition-colors transform hover:scale-105 duration-300"
              >
                Join Unisun Today
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors transform hover:scale-105 duration-300"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white h-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 border-t-2">
        <div className="items-center flex flex-col">
          <div className="flex flex-row justify-between mt-10 w-full gap-4">
            <div className="rounded-lg flex items-center justify-center">
              <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center">
                <div className="w-14 h-14 rounded-lg flex items-center justify-center">
                  <div className="bg-white rounded-lg flex items-center justify-center">
                    <img src={Logo} alt="Logo" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-row gap-10">
              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#FE592E] transition-colors duration-200"
              >
                <Instagram />
              </a>

              <a
                href="https://www.linkedin.com/in/viraj-chapaneri/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#FE592E] transition-colors duration-200"
              >
                <Linkedin />
              </a>

              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#FE592E] transition-colors duration-200"
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
export default AboutPage;
