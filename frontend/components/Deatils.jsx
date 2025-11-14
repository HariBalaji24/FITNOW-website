import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../context/context";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const Details = () => {
  const navigate = useNavigate();
  const { token, id } = useContext(Context);

  const [form, setForm] = useState({
    userid: null,
    age: "",
    gender: "",
    height: "",
    weight: "",
    bmi: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const updated = { ...prev, [name]: value };
      if (updated.height && updated.weight) {
        const hM = updated.height / 100;
        updated.bmi = (updated.weight / (hM * hM)).toFixed(2);
      }
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      form.userid = id;
      await axios.post("http://localhost:3000/adddetails", form, {
        headers: { "Content-Type": "application/json" },
      });

      toast.success("Details saved successfully!", {
        position: "top-center",
        
      });

      setTimeout(() => navigate("/"), 1300);
    } catch (err) {
      toast.error("Something went wrong!", {
        position: "top-center",
        icon: "❌",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-screen flex items-center justify-center px-5 relative"
    >
      {/* Background Aurora Glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1.2, delay: 0.4 }}
        className="absolute inset-0 -z-10 pointer-events-none"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.4 }}
          className="absolute w-[400px] h-[400px] bg-purple-600 blur-[150px] top-10 left-1/3"
        />
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.8 }}
          className="absolute w-[400px] h-[400px] bg-blue-500 blur-[170px] bottom-10 right-1/3"
        />
      </motion.div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
        className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-xl"
      >
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center text-2xl font-bold text-white tracking-wide mb-6"
        >
          Build Your Fitness Profile
        </motion.h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Age */}
          <motion.input
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 }}
            name="age"
            type="number"
            placeholder="Age"
            value={form.age}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/10 border border-white/25 
            text-white placeholder-gray-300 focus:border-purple-400 transition"
          />

          {/* Gender */}
          <motion.select
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.30 }}
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/10 border border-white/25 text-white cursor-pointer
            focus:border-purple-400 transition"
          >
            <option value="" className="text-gray-800">
              Select Gender
            </option>
            <option value="male" className="text-gray-800">
              Male
            </option>
            <option value="female" className="text-gray-800">
              Female
            </option>
            <option value="other" className="text-gray-800">
              Other
            </option>
          </motion.select>

          {/* Height */}
          <motion.input
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 }}
            name="height"
            type="number"
            placeholder="Height (cm)"
            value={form.height}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/10 border border-white/25 
            text-white placeholder-gray-300 focus:border-purple-400 transition"
          />

          {/* Weight */}
          <motion.input
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.40 }}
            name="weight"
            type="number"
            placeholder="Weight (kg)"
            value={form.weight}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/10 border border-white/25 
            text-white placeholder-gray-300 focus:border-purple-400 transition"
          />

          {/* BMI */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="text-center text-white text-lg font-semibold"
          >
            BMI:
            <span className="ml-2 px-4 py-1 bg-blue-600/80 rounded-full shadow-[0_0_7px_rgba(0,140,255,0.8)]">
              {form.bmi || "--"}
            </span>
          </motion.div>

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="w-full py-3 bg-purple-500 hover:bg-purple-600 text-white 
            font-semibold rounded-lg transition"
          >
            Save & Continue
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Details;
