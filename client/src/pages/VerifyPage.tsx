import myPhoto from "../assets/loginpage_icons/signup_left_image.png";
import Logo from "../assets/homepage_icons/unisun_logo.png";

const VerifyPage = () => {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Left side image */}
      <div className="flex-1 flex items-center justify-center bg-[#a7e1a7]">
        <img
          src={myPhoto}
          alt="Left"
          className="block w-[80vh] h-[80vh] object-cover border-0 select-none"
        />
      </div>
      <div className="flex flex-col flex-1 justify-center py-12 px-6">
        <div className="max-w-md w-full mx-auto">
          <div className="flex justify-center">
            <div className="w-24 h-24 bg-white rounded-lg flex items-center justify-center">
              <img src={Logo} alt="Logo" />
            </div>
          </div>
          <div className="mx-auto w-full max-w-md">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Verify your email address
            </h2>
          </div>
          <div className="mt-10 mx-auto w-full max-w-md">
            <div className="bg-white py-8 px-6 shadow-lg rounded-lg">
              <form className="space-y-5">
                {/* Full Name Field */}
                <div className="text-center relative w-full flex flex-col max-w-sm pt-[10%] gap-8 pb-[10%]">
                  <p className="text-gray-700 text-md align-center">
                    We have sent a verification email to the registered email
                  </p>
                  <div className="gap-">
                    <p className="text-gray-700 pb-2 text-md align-center">
                      Enter the code
                    </p>
                    <p className="text-gray-700 text-md align-center">
                      You may need to
                      <span className="font-bold"> check your spam folder</span>
                    </p>
                  </div>
                </div>

                {/* Password */}
                <div className="relative w-full max-w-sm">
                  <input
                    id="verification_code"
                    name="verification_code"
                    type="text"
                    placeholder="Password"
                    className="appearance-none block w-full px-3 py-2 pr-10 border-b border-gray-300 placeholder-gray-400 focus:outline-none focus:border-blue-500 rounded-md"
                  />
                </div>

                <div className="pt-[10%]">
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-[#ff4900] hover:bg-[#e64500] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Verify Account
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyPage;

// go to hubspot and use the colour from there site
