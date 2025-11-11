import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("auth-token"));
  const [id, setid] = useState(null);
  const [name, setname] = useState(null);

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

  return (
    <Context.Provider value={{ token, id, setid, name, setname, setToken }}>
      {children}
    </Context.Provider>
  );
};
