import { useState } from "react";
import { EyeClosed, Eye } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import type { ChangeEvent } from "react";
import { useAuth } from "../contexts/AuthContext";
import myPhoto from "../assets/loginpage_icons/signup_left_image.png";
import Logo from "../assets/homepage_icons/unisun_logo.png";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [backendError, setBackendError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
      return "Please enter a valid email address";
    }
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    const newErrors = {
      email: validateEmail(formData.email),
      password: !formData.password ? "Password is required" : "",
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).filter(Boolean).length > 0;
    if (hasErrors) {
      setIsSubmitting(false);
      return;
    }

    try {
      await login(formData.email, formData.password);

      // Login successful, redirect to dashboard
      navigate("/forum");
    } catch (error: any) {
      setBackendError(
        error.response?.data?.message || "Login failed. Please try again."
      );
      console.error("Login error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <div className="flex-1 hidden lg:flex items-center justify-center bg-[#a7e1a7] ">
        <img
          src={myPhoto}
          alt="Left"
          onMouseDown={(e) => e.preventDefault()}
          className="w-[80vh] h-[80vh] object-cover border-0 select-none"
        />
      </div>
      <div className="flex flex-col flex-1 justify-center py-12 sm:px-6 lg:px-8">
        <div className="max-w-md w-full mx-auto">
          <div className="flex justify-center">
            <div className="w-24 h-24 bg-white rounded-lg flex items-center justify-center">
              <img
                src={Logo}
                alt="Logo_home"
                onClick={() => navigate("/")}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-6 shadow-lg sm:rounded-lg">
              {backendError && (
                <div className="text-red-500 text-sm font-small mb-3 rounded-md">
                  {backendError}
                </div>
              )}

              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Email Field */}
                <div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={handleChange}
                    value={formData.email}
                    autoFocus
                    placeholder="Email"
                    className="appearance-none block w-full px-3 py-2 border-b border-gray-300 placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  />
                  {errors.email && (
                    <p className="text-red-500 mt-1 text-sm">{errors.email}</p>
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

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white ${
                      isSubmitting
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-[#ff4900] hover:bg-[#e64500] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    }`}
                  >
                    {isSubmitting ? "Signing in..." : "Sign in"}
                  </button>
                </div>

                {/* Sign Up Link */}
                <div className="mt-6 text-center">
                  <span className="text-black">Don't have an account? </span>
                  <Link
                    to="/signup"
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Sign up
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
