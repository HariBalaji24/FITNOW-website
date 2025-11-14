import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("auth-token"));
  const [id, setid] = useState(null);
  const [name, setname] = useState(null);
  const [details, setDetails] = useState(null);
  const [loading,setloading] = useState(true)
  useEffect(() => {
    async function fetchid() {
      if (!token) return;
      try {
        const res = await axios.get("http://localhost:3000/getid", {
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
          const url = `http://localhost:3000/userdetails/${id}`;
          const response = await axios.get(url);
          setDetails(response.data);
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
      fetchWorkout();
    },[id]);

  useEffect(() => {
    if (!details) return;

    async function getWorkout() {
      setloading(true)
      try {
        const url = "http://localhost:3000/workout-plan";
        const response = await axios.post(url, details);
        setloading(false)
      } catch (error) {
        console.error("Error generating workout plan:", error);
      } finally {
      }
    }

    getWorkout();
  }, [details]);
  return (
    <Context.Provider value={{ token, id, setid, name, setname, setToken, loading  }}>
      {children}
    </Context.Provider>
  );
};
