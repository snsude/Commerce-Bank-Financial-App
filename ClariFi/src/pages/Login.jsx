import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    console.log("Login attempt:", { username, password, remember });
    navigate('/Dashboard');
  };

  // make sure to add error for incorrect login within main box

  const handleSingUp = () => {
    navigate("/NewUser");
  };

  return (
    <div className="h-screen bg-white flex overflow-hidden ">
      {/*Left side - Contains the image  */}
      <div className="w-1/2 hidden lg:block">
        <img
          src="/Background.png"
          alt="Login Background"
          className="object-cover w-full h-full "
        />
      </div>
      {/*Right side - Contains the login form  + Logo */}
      <div className="lg:p-36 md:p-52 sm:p-20 p-8 w-full lg:w-1/2">
       <div className="flex justify-center mb-4 relative left-[-24px]">
          <img
            src="/ClariFi-Logo.png"
            alt="Company Logo"
            className="h-auto w-auto"
          />
        </div>
         <div className="w-full max-w-md bg-[#7D5BA6] rounded-2xl p-8 border-9 border-[#89CE94] shadow-[0_13px_13px_#020000]">
        <h1 className="text-3xl font-bold text-white mb-4 text-center">
              Login
            </h1>
        {/*Login Form */}
        <div>
            <div className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-white text-sm font-medium mb2">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:border-blue-50 bg-white"
                  autoComplete="off"
                  placeholder="Username, Email or Phone Number"
                />
              </div>
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-white ">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 bg-white"
              autoComplete="off"
            />
          </div>

          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="remember"
              name="remember"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="text-blue-500"
            />
            <label htmlFor="remember" className="text-white ml-2">
              Remember Me
            </label>
          </div>

          <div className="mb-6 text-white">
            <a href="#" className="hover:underline">
              Forgot Password?
            </a>
          </div>

          <button
            onClick={handleSubmit}
            className="bg-[#89CE94] hover:bg-[#89A59C] text-white font-semibold rounded-md py-2 px-4 w-full"
          >
            Login
          </button>
        </div>
        <div className="mt-4 text-white text-center ">
           <h3>Don't have an account </h3>
        </div>
        <div className="mt-2 text-white text-center">
          <a href="#" className="hover:underline, hover:text-[#89CE94]"   onClick={handleSingUp}>
            Sign up Here
          </a>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Login;
