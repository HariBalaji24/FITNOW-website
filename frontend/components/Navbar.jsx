import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="navbar bg-gray-950 w-full px-6 shadow-sm">

      {/* LEFT SECTION */}
      <div className="navbar-start flex items-center gap-2">
        {/* HAMBURGER ICON */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setIsOpen(true)}
        >
          ☰
        </button>

        {/* LOGO */}
        <a className="btn btn-ghost normal-case text-xl font-bold text-white">
          FitNow
        </a>
      </div>

      {/* CENTER NAV (Desktop Only) */}
      <div
        className="
        w-[170%]
        hidden md:flex
        justify-center items-center
        md:gap-7 md:text-[15px]
        gap-4 lg:gap-10 lg:text-[16px] xl:gap-14
        font-semibold cursor-pointer text-white
      "
      >
        {["Dashboard", "Workouts", "AI Coach", "Diet Plans", "Progress"].map((text) => (
          <a key={text} className="relative group">
            {text}
            <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
          </a>
        ))}
      </div>

      {/* RIGHT SECTION */}
      <div className="navbar-end">
        <Link to={"/signin"}><a className="btn btn-primary">Sign in</a></Link>
        
      </div>

      {/* 🟫 SIDE DRAWER (Mobile Menu) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-200"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`
          fixed top-0 left-0 h-full w-64 cursor-pointer
          bg-gray-300 text-white font-semibold
          flex flex-col items-center justify-center
          gap-8 text-lg
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          z-300
        `}
      >
        {["Dashboard", "Workouts","AI Coach", "Diet Plans", "Progress"].map((text) => (
          <a
            key={text}
            className="hover:text-black transition"
            onClick={() => setIsOpen(false)}
          >
            {text}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
