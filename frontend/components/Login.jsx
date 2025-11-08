import React, { useState } from "react";
import axios from axios

const Login = () => {
  const [isSignup, setIsSignup] = useState(true);
  const [user,setuser] = useState({name:"",email:"",password:""})

  const handlechange = (e) =>{
     
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-lg p-8 space-y-6">
        <h2 className="text-2xl font-semibold text-center">
          {isSignup ? "Create an Account" : "Welcome Back"}
        </h2>

        <form className="space-y-4">
          {isSignup && (
            <input
              name="name"
              type="text"
              placeholder="Full Name"
              className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring"
              value={user.name}
              onChange={handlechange}
            />
          )}
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring"
            value={user.email}
              onChange={handlechange}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring"
            value={user.password}
              onChange={handlechange}
          />

          <button
            
            type="submit"
            className="w-full bg-blue-600 cursor-pointer text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            {isSignup ? "Sign Up" : "Log In"}
          </button>
        </form>

        <div className="flex items-center justify-center">
          <span className="text-sm text-white">
            {isSignup ? "Already have an account?" : "Don't have an account?"}
          </span>
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="text-blue-600 cursor-pointer text-sm ml-2 hover:underline"
          >
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </div>

        <div className="flex items-center justify-center">
          <div className="border-t w-1/3" />
          <span className="text-sm text-white px-2">or</span>
          <div className="border-t w-1/3" />
        </div>

        <button className="w-full border border-gray-300 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-blue-600 cursor-pointer transition">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span>Continue with Google</span>
        </button>
      </div>
    </div>
  );
};

export default Login;
