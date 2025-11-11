import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../context/context";

const Details = () => {
  const navigate = useNavigate();
  const { token, id } = useContext(Context);
  const [form, setForm] = useState({
    userid:null,
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
        const heightM = updated.height / 100;
        updated.bmi = (updated.weight / (heightM * heightM)).toFixed(2);
      }

      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      form.userid = id
      const response = await axios.post("http://localhost:3000/adddetails",form,{
        headers: {"Content-Type" : "application/json"}
      });
      setTimeout(()=>{
          navigate("/")
      },2000)
      
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  };
  console.log(id);
  return (
    <div className="min-h-screen flex items-center justify-center bg-glass-aurora p-5">
      <div className="w-full max-w-md glass-card p-8 rounded-2xl animate-slide-up">
        <h2 className="text-center text-2xl font-bold text-white tracking-wide mb-6">
          Build Your Fitness Profile
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Age */}
          <input
            name="age"
            type="number"
            placeholder="Age"
            value={form.age}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/10 border border-white/30 text-white 
            placeholder-gray-300 input-glow transition"
          />

          {/* Gender */}
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/10 border border-white/30 text-white 
            cursor-pointer placeholder-gray-300 input-glow transition"
          >
            <option value="" className="text-gray-900">
              Select Gender
            </option>
            <option value="male" className="text-gray-900">
              Male
            </option>
            <option value="female" className="text-gray-900">
              Female
            </option>
            <option value="other" className="text-gray-900">
              Other
            </option>
          </select>

          {/* Height */}
          <input
            name="height"
            type="number"
            placeholder="Height (cm)"
            value={form.height}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/10 border border-white/30 text-white 
            placeholder-gray-300 input-glow transition"
          />

          {/* Weight */}
          <input
            name="weight"
            type="number"
            placeholder="Weight (kg)"
            value={form.weight}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/10 border border-white/30 text-white 
            placeholder-gray-300 input-glow transition"
          />

          {/* BMI Display */}
          <div className="text-center text-white text-lg font-semibold">
            BMI:{" "}
            <span className="ml-2 px-4 py-1 bg-blue-600/80 rounded-full shadow-[0_0_7px_rgba(0,140,255,0.8)]">
              {form.bmi || "--"}
            </span>
          </div>

          {/* Save Button */}
          <button
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg 
            btn-lift transition"
          >
            Save & Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default Details;
