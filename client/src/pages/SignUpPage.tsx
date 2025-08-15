import { useState } from "react";
import { EyeClosed, Eye } from "lucide-react";

const SignUpPage = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted");
  };

  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex flex-col min-h-screen bg-white justify-center py-12 sm:px-6 lg:px-8">
      <div className="absolute top-5 left-5">
        <span className="text-lg text-black font-bold">
          Logo<span className="underline">Company</span>
        </span>
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign Up
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Sign up to continue
        </p>
      </div>
      {/* Defining the form */}
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-lg sm:rounded-lg ">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name Field */}
            <div>
              <input
                id="name"
                name="name"
                type="text"
                required
                value="name"
                className="appearance-none block w-full px-3 py-2 border-b border-gray-300 placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
            </div>
            {/* Email Field */}
            <div>
              <input
                id="email"
                name="email"
                type="email"
                required
                value="email"
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
                value="password"
                className="appearance-none block w-full px-3 py-2 pr-10 border-b border-gray-300 placeholder-gray-400 focus:outline-none focus:border-blue-500 rounded"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
              >
                {showPassword ? <Eye /> : <EyeClosed />}
              </button>
            </div>
            {/* Role */}
            <div>
              <input
                id="role"
                name="role"
                list="fruit-options"
                required
                value="role"
                className="appearance-none block w-full px-3 py-2 border-b border-gray-300 placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
              <datalist id="fruit-options">
                <option value="Apple" />
                <option value="Banana" />
                <option value="Orange" />
              </datalist>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
