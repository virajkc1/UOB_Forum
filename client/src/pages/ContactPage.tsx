import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { Instagram, Twitter, Linkedin } from "lucide-react";
import { useState } from "react";
import Logo from "../assets/homepage_icons/unisun_logo.png";

export const ContactPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const faqs = [
    {
      question: "How do I join the Unisun community?",
      answer:
        "Simply click the 'Sign Up' button and create an account with your university email. You'll need to verify your student or alumni status to access the platform.",
    },
    {
      question: "Is Unisun free to use?",
      answer:
        "Yes! Unisun is completely free for both students and alumni. We believe in making knowledge sharing accessible to everyone.",
    },
    {
      question: "How do I verify my university status?",
      answer:
        "After signing up, you'll receive an email with verification instructions. You can use your university email or upload a student/alumni ID for verification.",
    },
    {
      question: "Can I contact alumni from any university?",
      answer:
        "Yes! While we encourage connections within your own university community, you can connect with alumni from any institution on our platform.",
    },
    {
      question: "How do I report inappropriate content?",
      answer:
        "You can report any inappropriate content by clicking the report button on posts or by contacting our support team directly through this contact form.",
    },
    {
      question: "Do you offer internships or job opportunities?",
      answer:
        "Yes! Many alumni post internship and job opportunities on our platform. You can also check our 'Join Our Team' section if you're interested in working with us.",
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
              <Link to="/team" className="btn-secondary">
                Team
              </Link>
              <Link to="/contact" className="btn-secondary bg-gray-100">
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
            <span className="block">Get in Touch</span>
            <span className="block green-primary-text">We're Here to Help</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto mb-12"
          >
            Have questions about Unisun? Need help with your account? Want to
            collaborate? We'd love to hear from you. Reach out and we'll get
            back to you within 24 hours.
          </motion.p>
        </div>
      </section>

      {/* Contact Methods Section */}
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
              Contact Information
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Choose the best way to reach us.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-16 h-16 bg-[#FE592E] rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-black mb-2">Email Us</h3>
              <p className="text-gray-600 mb-4">Send us an email</p>
              <a
                href="mailto:hello@unisun.com"
                className="text-[#FE592E] hover:underline"
              >
                hello@unisun.com
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-16 h-16 bg-[#8ECC8E] rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-black mb-2">Live Chat</h3>
              <p className="text-gray-600 mb-4">Chat with our team</p>
              <span className="text-[#8ECC8E] font-semibold">
                Available 9AM-6PM
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-16 h-16 bg-[#FE592E] rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-black mb-2">Call Us</h3>
              <p className="text-gray-600 mb-4">Speak with our team</p>
              <a
                href="tel:+1-555-0123"
                className="text-[#FE592E] hover:underline"
              >
                +1 (555) 012-3456
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-16 h-16 bg-[#8ECC8E] rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-black mb-2">Visit Us</h3>
              <p className="text-gray-600 mb-4">Our office location</p>
              <span className="text-gray-700 text-sm">
                123 University Ave
                <br />
                Tech City, TC 12345
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Send us a Message
            </h2>
            <p className="text-lg text-gray-600">
              Fill out the form below and we'll get back to you as soon as
              possible.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gray-50 rounded-2xl p-8 shadow-lg"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FE592E] focus:border-transparent transition-colors"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FE592E] focus:border-transparent transition-colors"
                    placeholder="your.email@university.edu"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FE592E] focus:border-transparent transition-colors"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FE592E] focus:border-transparent transition-colors resize-none"
                  placeholder="Tell us more about your question or how we can help..."
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="btn-primary-color px-12 py-4 rounded-lg text-center whitespace-nowrap hover:scale-105 hover:shadow-xl transform transition-all duration-300"
                >
                  Send Message
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Quick answers to common questions about Unisun.
            </p>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <h3 className="text-xl font-bold text-black mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
              Follow Us on Social Media
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Stay updated with the latest news and community highlights.
            </p>
            <div className="flex justify-center space-x-8">
              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 bg-[#FE592E] rounded-full flex items-center justify-center hover:bg-[#e64500] transition-colors duration-200 transform hover:scale-105"
              >
                <Instagram className="w-8 h-8 text-white" />
              </a>
              <a
                href="https://www.linkedin.com/in/viraj-chapaneri/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 bg-[#8ECC8E] rounded-full flex items-center justify-center hover:bg-[#7bb37b] transition-colors duration-200 transform hover:scale-105"
              >
                <Linkedin className="w-8 h-8 text-white" />
              </a>
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 bg-[#FE592E] rounded-full flex items-center justify-center hover:bg-[#e64500] transition-colors duration-200 transform hover:scale-105"
              >
                <Twitter className="w-8 h-8 text-white" />
              </a>
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

export default ContactPage;
