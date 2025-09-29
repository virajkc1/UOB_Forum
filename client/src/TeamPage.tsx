import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, Github, Mail } from "lucide-react";
import { Instagram, Twitter, Linkedin } from "lucide-react";
import { useState } from "react";
import Logo from "./assets/homepage_icons/unisun_logo.png";

export const TeamPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const teamMembers = [
    {
      name: "Viraj Chapaneri",
      role: "Founder & CEO",
      bio: "Passionate about connecting students and alumni. Viraj founded Unisun to bridge the gap between academic generations.",
      initials: "VC",
      color: "bg-[#FE592E]",
      social: {
        linkedin: "https://www.linkedin.com/in/viraj-chapaneri/",
        github: "https://github.com/virajchapaneri",
        email: "viraj@unisun.com",
      },
    },
    {
      name: "Sarah Johnson",
      role: "Lead Developer",
      bio: "Full-stack developer with 5+ years experience. Sarah leads our technical development and platform architecture.",
      initials: "SJ",
      color: "bg-[#8ECC8E]",
      social: {
        linkedin: "https://linkedin.com/in/sarahjohnson",
        github: "https://github.com/sarahjohnson",
        email: "sarah@unisun.com",
      },
    },
    {
      name: "Michael Chen",
      role: "Product Designer",
      bio: "UX/UI designer focused on creating intuitive user experiences. Michael ensures our platform is both beautiful and functional.",
      initials: "MC",
      color: "bg-[#FE592E]",
      social: {
        linkedin: "https://linkedin.com/in/michaelchen",
        github: "https://github.com/michaelchen",
        email: "michael@unisun.com",
      },
    },
    {
      name: "Emily Rodriguez",
      role: "Community Manager",
      bio: "Former university student advisor with a passion for community building. Emily helps foster meaningful connections on our platform.",
      initials: "ER",
      color: "bg-[#8ECC8E]",
      social: {
        linkedin: "https://linkedin.com/in/emilyrodriguez",
        github: "https://github.com/emilyrodriguez",
        email: "emily@unisun.com",
      },
    },
  ];

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
              <Link to="/about" className="btn-secondary">
                About
              </Link>
              <Link to="/team" className="btn-secondary bg-gray-100">
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
            <span className="block">Meet the Team</span>
            <span className="block green-primary-text">Behind Unisun</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto mb-12"
          >
            We're a passionate team of developers, designers, and community
            builders dedicated to creating meaningful connections between
            students and alumni worldwide.
          </motion.p>
        </div>
      </section>

      {/* Team Members Section */}
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
              Our Team Members
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Get to know the people who make Unisun possible.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
              >
                <div
                  className={`w-20 h-20 ${member.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                >
                  <span className="text-white font-bold text-2xl">
                    {member.initials}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-black mb-2">
                  {member.name}
                </h3>
                <p className="text-[#FE592E] font-semibold mb-4">
                  {member.role}
                </p>
                <p className="text-gray-700 text-sm leading-relaxed mb-6">
                  {member.bio}
                </p>

                <div className="flex justify-center space-x-4">
                  <a
                    href={member.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-[#FE592E] transition-colors duration-200"
                  >
                    <Linkedin size={20} />
                  </a>
                  <a
                    href={member.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-[#FE592E] transition-colors duration-200"
                  >
                    <Github size={20} />
                  </a>
                  <a
                    href={`mailto:${member.social.email}`}
                    className="text-gray-600 hover:text-[#FE592E] transition-colors duration-200"
                  >
                    <Mail size={20} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Values Section */}
      <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do at Unisun.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-[#FE592E] rounded-full flex items-center justify-center mx-auto mb-6">
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
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-black mb-4">
                Community First
              </h3>
              <p className="text-gray-700">
                We believe that strong communities are built on trust, respect,
                and genuine connections between people.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-[#8ECC8E] rounded-full flex items-center justify-center mx-auto mb-6">
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
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-black mb-4">Innovation</h3>
              <p className="text-gray-700">
                We continuously innovate to create better ways for students and
                alumni to connect and share knowledge.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-[#FE592E] rounded-full flex items-center justify-center mx-auto mb-6">
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-black mb-4">Excellence</h3>
              <p className="text-gray-700">
                We strive for excellence in everything we do, from user
                experience to community support and platform reliability.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Join Our Team Section */}
      <section className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
              Want to Join Our Team?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              We're always looking for passionate individuals who want to make a
              difference in how students and alumni connect. Check out our open
              positions or reach out to learn more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-4 tile-background text-white font-semibold rounded-lg hover:bg-[#e64500] transition-colors transform hover:scale-105 duration-300"
              >
                View Open Positions
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors transform hover:scale-105 duration-300"
              >
                Get in Touch
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
