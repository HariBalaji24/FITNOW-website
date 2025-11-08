import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Login from "../components/Login";
import Home from "../components/Home";

function WithNavbarLayout(){
  return (
    <>
      <Navbar />
      <Outlet/>
    </>
  )
}

function WithoutNavbarLayout(){
  return (
    <>
      <Outlet/>
    </>
  )
}

function App() {
  return (
  <BrowserRouter>
      
      <Routes>
        <Route element={<WithNavbarLayout/>}>
           <Route path="/" element={<Home/>} />
        </Route>
        <Route element={<WithoutNavbarLayout/>}>
          <Route path="/signin" element={<Login/>}/>  
        </Route>
      </Routes>
   </BrowserRouter> 
  );
}

export default App;
