import React, { useState, useContext } from "react";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { Context } from "../context/context";

const Login = () => {
  const { setusername, setid,id } = useContext(Context);
  const [isSignup, setIsSignup] = useState(true);
  const [user, setuser] = useState({ name: "", email: "", password: "" });

  const navigate = useNavigate();

  const responsegoogle = async (authResult) => {
    try {
      if (authResult.code) {
        const response = await axios.get(
          `http://localhost:3000/google?code=${authResult.code}`
        );
        const { token, user } = response.data;
        localStorage.setItem("auth-token", token);
        setusername(user.name);
        if(isSignup){
          navigate("/details");
        }
        else{
          navigate("/")
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const googlelogin = useGoogleLogin({
    onSuccess: responsegoogle,
    onError: responsegoogle,
    flow: "auth-code",
  });

  const handlesubmit = async (e) => {
    e.preventDefault();
    const url = `http://localhost:3000/${isSignup ? "signin" : "login"}`;
    const payload = {
      email: user.email,
      password: user.password,
      ...(isSignup && { name: user.name }),
    };

    try {
      const res = await axios.post(url, payload, {
        headers: { "Content-Type": "application/json" },
      });

      localStorage.setItem("auth-token", res.data.token);
      if (isSignup) {
        navigate("/details");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-glass-aurora p-5">
      <div className="w-full max-w-md glass-card p-8 rounded-2xl animate-slide-up">
        <h2 className="text-center text-2xl font-bold text-white tracking-wide mb-6">
          {isSignup ? "Create Account" : "Welcome Back"}
        </h2>

        <form className="space-y-5" onSubmit={handlesubmit}>
          {isSignup && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={user.name}
              onChange={(e) => setuser({ ...user, name: e.target.value })}
              className="w-full p-3 rounded-lg bg-white/10 border border-white/30 text-white placeholder-gray-300 input-glow transition"
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={user.email}
            onChange={(e) => setuser({ ...user, email: e.target.value })}
            className="w-full p-3 rounded-lg bg-white/10 border border-white/30 text-white placeholder-gray-300 input-glow transition"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={(e) => setuser({ ...user, password: e.target.value })}
            className="w-full p-3 rounded-lg bg-white/10 border border-white/30 text-white placeholder-gray-300 input-glow transition"
          />

          <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg btn-lift transition">
            {isSignup ? "Sign Up" : "Log In"}
          </button>
        </form>

        <div className="text-center text-gray-300 mt-4">
          {isSignup ? "Already have an account?" : "New here?"}
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="text-blue-400 ml-2 cursor-pointer "
          >
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </div>

        <div className="text-center text-gray-500 my-4">or</div>

        <button
          onClick={googlelogin}
          className="w-full py-3 border border-gray-500 hover:border-blue-400 hover:bg-blue-600 text-white rounded-lg transition btn-lift flex justify-center items-center gap-2"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            className="w-5"
          />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
