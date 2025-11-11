import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ContextProvider } from "../context/context.jsx";
import Plasma from "../animations/aurora.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ContextProvider>
      <App />
      <div className="z-[-10]" style={{ width: "100%", height: "100vmin", position: "relative" }}>
        <Plasma
          color="B13BFF"
          speed={0.6}
          direction="forward"
          scale={1.1}
          opacity={0.8}
        />
      </div>
      
    </ContextProvider>
  </BrowserRouter>
);
