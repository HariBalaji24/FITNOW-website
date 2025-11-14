import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const token = localStorage.getItem("auth-token");
  const [id, setid] = useState(null);
  const [details, setDetails] = useState(null);

  const endpoint = ""
  useEffect(() => {
    async function fetchid() {
      if (!token) return;
      try {
        const res = await axios.get("https://fitnow-website-1.onrender.com/getid", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setid(res.data.user_id);
        setname(res.data.name);
      } catch (error) {
        console.log(error);
      }
    }
    fetchid();
  }, [token]);

  useEffect(() => {
    if (!id) return;
    async function fetchWorkout() {
      try {
        const url = `https://fitnow-website-1.onrender.com/userdetails/${id}`;
        const response = await axios.get(url);
        setDetails(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    }
    fetchWorkout();
  }, [id]);

  useEffect(() => {
    if (!details) return;

    async function getWorkout() {
      try {
        const url = "https://fitnow-website-1.onrender.com/workout-plan";
        const response = await axios.post(url, details);
      } catch (error) {
        console.error("Error generating workout plan:", error);
      }
    }

    getWorkout();
  }, [details]);
  return (
    <Context.Provider value={{ token, id, setid }}>{children}</Context.Provider>
  );
};
