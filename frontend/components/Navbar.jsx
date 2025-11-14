import React, { useContext } from "react";
import PillNav from "../animations/pillnav";
import { Context } from "../context/context";

const Navbar = () => {
  const {id,token} = useContext(Context)
  const logout = () => {
    console.log("clicked")
    localStorage.removeItem("auth-token");
    window.location.reload(); 
  };

  return (
    <PillNav
      logo="https://framerusercontent.com/images/wPUUFSxql4UyBvz6Yxj3iju3X0.jpeg"
      items={[
        { label: "Profile", href: "/profile" },
        { label: "Workouts", href: "/workouts" },
        { label: "AI Coach", href: "/aicoach" },
        { label: "Diet Plan", href: "/dietplan" },
        { label: "Progress", href: "/progress" },
      ]}
      authButton={
        token
          ? { label: "Logout", onClick: logout }
          : { label: "Sign In", href: "/signin" }
      }
    />
  );
};

export default Navbar;
