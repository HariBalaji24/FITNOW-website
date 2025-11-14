import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context } from "../context/context";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Workouts = () => {
  const { id, token } = useContext(Context);
  const [workouts, setWorkouts] = useState(null);
  const [loading,setloading] = useState(false)

  useEffect(() => {
    async function fetchWorkouts() {
      if (!id) return;
      try {
        const response = await axios.get(`https://fitnow-website-1.onrender.com/getworkouts/${id}`);
        setWorkouts(response.data);
        setloading(true)
      } catch (error) {
        console.log(error);
      }
    }
    fetchWorkouts();
  }, [id]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-screen w-full px-6 py-8 relative text-white flex flex-col items-center"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1.3, delay: 0.3 }}
          className="absolute w-[450px] h-[450px] bg-purple-600 blur-[180px] top-10 left-1/3"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1.3, delay: 0.7 }}
          className="absolute w-[450px] h-[450px] bg-violet-400 blur-[180px] bottom-10 right-1/3"
        />
      </div>

      {/* IF NOT LOGGED IN */}
      {!token && (
        <div className="mt-32 text-center">
          <h1 className="text-2xl font-semibold">Sign in to generate your workout plan</h1>
          <Link
            to="/signin"
            className="mt-5 inline-block bg-purple-500 hover:bg-purple-600 
                       text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            Go to Sign In
          </Link>
        </div>
      )}

      {/* IF LOGGED IN */}
      {token && (
        <>
          {/* Loading message */}
          {!loading && (
            <div className="text-gray-300 mt-20 font-semibold text-lg">
              Crafting your personalized fitness roadmap. Hold tight greatness is loading...
            </div>
          )}

          {/* Workouts Grid */}
          {loading && workouts && (
            <div
              className="
                mt-20
                grid 
                grid-cols-1 
                sm:grid-cols-3 
                md:grid-cols-4 
                lg:grid-cols-5 
                xl:grid-cols-6 
                gap-5 
                w-full max-w-6xl
              "
            >
              {workouts.map((work, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.03 }}
                  className="
                    p-4 rounded-xl 
                    bg-white/10 backdrop-blur-lg 
                    border border-white/20 
                    shadow-xl 
                    hover:scale-[1.05] 
                    transition 
                    cursor-pointer 
                    text-center
                  "
                >
                  <h2 className="text-xl font-bold text-purple-400">Day {work.day}</h2>
                  <p className="text-gray-200 mt-1 text-sm">{work.focus}</p>
                </motion.div>
              ))}
            </div>
          )}
        </>
      )}

    </motion.div>
  );
};

export default Workouts;
