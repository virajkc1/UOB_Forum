import { useRef, useState } from "react";
import { EyeClosed, Eye, Loader2, CheckCircle } from "lucide-react";
import type { ChangeEvent } from "react";
import myPhoto from "../assets/signup_left_image.png";
import { Link, useNavigate } from "react-router-dom";
import api from "../lib/api";

const SignUpPage = () => {
  const navigate = useNavigate(); //instance of useNavigate
  //states for the form
  const [showPassword, setShowPassword] = useState(false);
  const [backendError, setBackendError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submit, setSubmit] = useState(false);
  //State for the form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    year: "",
    role: "student",
  });

  //error state for the form
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    rePassword: "",
    year: "",
  });

  //Ref for the re-type password field
  const rePasswordRef = useRef<HTMLInputElement>(null); //react will use this to access the value of the re-type password field, initially null because it is not yet rendered

  //Function to handle the change in the form
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement> //the event is a changeEvent that comes from input or select elements
  ) => {
    //changes the state variable formData on a change to any input elements
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error for the field being changed
    if (errors[e.target.name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [e.target.name]: "",
      }));
    }
  };
  const validateEmail = (email: string) => {
    if (!email) return "Email is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      //checks if the email contains the regex criteria
      return "Please enter a valid email address";
    }
    const validDomain = ["student.bham.ac.uk", "alumni.bham.ac.uk"];
    const domain = email.split("@")[1]; //second part of the string

    if (!validDomain.includes(domain)) {
      //checks it includes
      return "Please enter a valid UOB student or alumni email ";
    }

    return "";
  };
  const validatePassword = (password: string) => {
    // >= 8 chars, 1 upper, 1 lower, includes 1 special character
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&-])[A-Za-z\d@$!%*?&-]{8,}$/;
    if (!passwordRegex.test(password)) {
      return "Password does not meet criteria";
    }
    return "";
  };
  const validateName = (name: string) => {
    if (!name) {
      return "Name is required";
    }
    const nameRegex = /^[A-Za-z\s-]+$/;
    if (!nameRegex.test(name)) {
      return "Name is invalid";
    }
    return "";
    //
  };
  const validateYear = (year: string) => {
    if (!year) {
      return "Please select your current year";
    }
    return "";
  };

  //Function to handle the submission of the form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    //defining the new errors
    //note all the verifications returned an empty string so the newErrors object wont be undefined
    const newErrors = {
      name: validateName(formData.name),
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      rePassword:
        rePasswordRef.current?.value !== formData.password
          ? "Password does not match"
          : "",
      year: validateYear(formData.year),
    };
    setErrors(newErrors);
    // Typescript states that each field should be a string, but your values can be undefined, so we return "" after each successful validation just look at any validation function

    //you want to set the newErrors to errors
    const hasErrors = Object.values(newErrors).filter(Boolean).length > 0;
    //creates an Array with the object called newErrors values, looks for positive booleans, and length must be bigger than 0
    if (hasErrors) {
      return;
    }
    //checking the user isSubmitting
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    //Here the form can be submitted
    try {
      const response = await api.post("/auth/register", formData);
      if (response.status === 201) {
        console.log("Registration successful:", response.data);
        setSubmit(true);
      }
    } catch (error: any) {
      if (
        error.response &&
        error.response.data.message ===
          "Account already created, Please try Login"
      )
        setBackendError(error.response.data.message);
      else {
        alert("Registration failed, please try again later");
      }
      console.error("Registration error:", error);
    } finally {
      setIsSubmitting(false); //this will set isSubmitting back to false
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left side image */}
      <div className="flex-1 hidden lg:flex items-center justify-center bg-[#a7e1a7] ">
        <img
          src={myPhoto}
          alt="Left"
          onMouseDown={(e) => e.preventDefault()}
          tabIndex={-1}
          className="block w-[80vh] h-[80vh] object-cover border-0 select-none"
        />
      </div>
      <div className="flex flex-col flex-1 justify-center py-12 sm:px-6 lg:px-8">
        <div className="max-w-md w-full mx-auto">
          <div
            className="flex justify-center"
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          >
            <span className="text-lg text-black font-bold">
              Logo<span className="underline">Company</span>
            </span>
          </div>
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Create an account
            </h2>
          </div>
          {!submit ? (
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
              <div className="bg-white py-8 px-6 shadow-lg sm:rounded-lg ">
                {backendError && (
                  <div className="text-red-500 text-sm font-small mb-3 rounded-md">
                    {backendError}
                  </div>
                )}
                <form className="space-y-5" onSubmit={handleSubmit}>
                  {/* Full Name Field */}
                  <div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      onChange={handleChange}
                      value={formData.name}
                      autoFocus
                      placeholder="Full Name"
                      className="appearance-none block w-full px-3 py-2 border-b border-gray-300 placeholder-gray-400 focus:outline-none focus:border-blue-500"
                    />
                    {errors.name && (
                      <p className="text-red-500 mt-1 text-sm">{errors.name}</p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      onChange={handleChange}
                      value={formData.email}
                      pattern="[a-zA-Z0-9._%+-]+@(student\.bham\.ac\.uk|alumni\.bham\.ac\.uk)"
                      title="Please enter a valid student email"
                      placeholder="Student Email"
                      className="appearance-none block w-full px-3 py-2 border-b border-gray-400 placeholder-gray-400 focus:outline-none focus:border-blue-500"
                    />
                    {errors.email && (
                      <p className="text-red-500 mt-1 text-sm">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  {/* Password */}
                  <div className="relative w-full max-w-sm">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      onChange={handleChange}
                      value={formData.password}
                      className="appearance-none block w-full px-3 py-2 pr-10 border-b border-gray-300 placeholder-gray-400 focus:outline-none focus:border-blue-500 rounded-md"
                    />
                    {errors.password && (
                      <p className="text-red-500 mt-1 text-sm">
                        {errors.password}
                      </p>
                    )}
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
                      placeholder="Re-type password"
                      ref={rePasswordRef} //references the useRef
                      //defines the input to look at, only looks at it once, not after every re-render

                      // onPaste={(e) => e.preventDefault()}
                      className="appearance-none block w-full px-3 py-2 pr-10 border-b border-gray-300 placeholder-gray-400 focus:outline-none focus:border-blue-500 rounded"
                    />
                    {errors.rePassword && (
                      <p className="text-red-500 mt-1 text-sm">
                        {errors.rePassword}
                      </p>
                    )}
                  </div>
                  {/* University Year */}
                  <div>
                    <select
                      id="year"
                      name="year"
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
                    {errors.year && (
                      <p className="text-red-500 mt-1 text-sm">{errors.year}</p>
                    )}
                  </div>
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting} //if False, it works else doesnt
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-[#ff4900] hover:bg-[#e64500] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center">
                          <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                          <span>Signing up...</span>
                        </div>
                      ) : (
                        <span>Sign up</span>
                      )}
                    </button>
                  </div>
                  {/* Sign In Link */}
                  <div className="mt-6 text-center">
                    <span className="text-black">
                      Already have an account?{" "}
                    </span>
                    <Link
                      to="/login"
                      className="font-medium text-blue-600 hover:text-blue-500"
                    >
                      Sign in
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
              <div className="bg-white py-8 px-6 shadow-lg sm:rounded-lg flex flex-col items-center justify-center">
                {/* Lucide check circle icon */}
                <CheckCircle
                  className="text-green-500 w-16 h-16 mb-4"
                  strokeWidth={2.5}
                />

                <h1 className="text-2xl font-bold m-4  text-center">
                  Account Created
                  <br />
                  Successfully!
                </h1>
                <p className="text-gray-700 mb-6 text-center">
                  Welcome aboard,{" "}
                  <span className="font-semibold">{formData.name}</span>!<br />
                  Your account has been created.
                </p>
                <div className="w-full flex justify-center text-center">
                  <Link
                    to="/login"
                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-[#ff4900] hover:bg-[#e64500]"
                  >
                    Continue
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;

// go to hubspot and use the colour from there site
