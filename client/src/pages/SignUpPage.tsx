import { useRef, useState } from "react";
import { EyeClosed, Eye } from "lucide-react";
import type { ChangeEvent } from "react";
import myPhoto from "../assets/signup_left_image.png";

const SignUpPage = () => {
  //State for the form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    year: "",
    role: "student",
  });

  //Ref for the re-type password field
  const rePasswordRef = useRef<HTMLInputElement>(null);

  //Function to handle the change in the form
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const validateEmail = (email: string) => {
    if (!email) return "Email is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }
    const validDomain = ["student.bham.ac.uk", "alumni.bham.ac.uk"];
    const domain = email.split("@")[1];

    if (validDomain.includes(domain)) {
      return "Please enter a valid student email (student.bham.ac.uk or alumni.bham.ac.uk)";
    }
  };

  //Function to handle the submission of the form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rePasswordRef.current?.value !== formData.password) {
      alert("Passwords do not match!");

      setFormData({
        ...formData,
        password: "",
      });

      if (rePasswordRef.current) {
        rePasswordRef.current.value = "";
      }
      return;
    }
    console.log("Form Submitted");
  };

  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex min-h-screen bg-white">
      {/* Left side image */}
      <div className="flex-1 hidden lg:flex items-center justify-center bg-[#a7e1a7] ">
        <img
          src={myPhoto}
          alt="Left"
          className="w-[80vh] h-[80vh] object-cover border-0"
        />
      </div>
      <div className="flex flex-col flex-1 justify-center py-12 sm:px-6 lg:px-8">
        <div className="max-w-md w-full mx-auto">
          <div className="flex justify-center">
            <span className="text-lg text-black font-bold">
              Logo<span className="underline">Company</span>
            </span>
          </div>
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Create an account
            </h2>
          </div>
          {/* Defining the form */}
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-6 shadow-lg sm:rounded-lg ">
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Full Name Field */}
                <div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    onChange={handleChange}
                    value={formData.name}
                    required
                    placeholder="Full Name"
                    className="appearance-none block w-full px-3 py-2 border-b border-gray-300 placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={handleChange}
                    value={formData.email}
                    pattern="^[a-zA-Z0-9._%+-]+@(student\.bham\.ac\.uk|alumni\.bham\.ac\.uk)$"
                    title="Please enter a valid student email"
                    required
                    placeholder="Student Email"
                    className="appearance-none block w-full px-3 py-2 border-b border-gray-300 placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  />
                </div>
                {/* Password */}
                <div className="relative w-full max-w-sm">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Password"
                    onChange={handleChange}
                    value={formData.password}
                    className="appearance-none block w-full px-3 py-2 pr-10 border-b border-gray-300 placeholder-gray-400 focus:outline-none focus:border-blue-500 rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 p-1 top-1/2 transform -translate-y-1/2 text-gray-600"
                  >
                    {showPassword ? <Eye /> : <EyeClosed />}
                  </button>
                </div>
                {/* Re-type Password */}
                <div className="relative w-full max-w-sm">
                  <input
                    id="re_password"
                    name="re_password"
                    type="password"
                    required
                    // value="re-type-password"
                    placeholder="Re-type password"
                    ref={rePasswordRef}
                    className="appearance-none block w-full px-3 py-2 pr-10 border-b border-gray-300 placeholder-gray-400 focus:outline-none focus:border-blue-500 rounded"
                  />
                </div>
                {/* University Year */}
                <div>
                  <select
                    id="year"
                    name="year"
                    required
                    onChange={handleChange}
                    value={formData.year}
                    className="block w-full px-3 py-2  rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 placeholder-gray-400 border-b"
                  >
                    <option value="" disabled className="text-gray-400">
                      Current Year
                    </option>
                    <option value="Foundation Year">Foundation Year</option>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                    <option value="Alumni">Alumni</option>
                  </select>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-[#ff4900] hover:bg-[#e64500] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <span>Sign up</span>
                  </button>
                </div>
                {/* Sign In Link */}
                <div className="mt-6 text-center">
                  <span className="text-black">Already have an account? </span>
                  <a
                    href="#"
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Sign in
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;

// go to hubspot and use the colour from there site
