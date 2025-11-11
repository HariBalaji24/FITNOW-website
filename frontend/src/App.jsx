import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import { GoogleOAuthProvider} from "@react-oauth/google"
import Navbar from "../components/Navbar";
import Login from "../components/Login";
import Home from "../components/Home";
import Deatils from "../components/Deatils";


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

const Googlewrapper = () => {
  return (
    <GoogleOAuthProvider clientId="922837798894-rbonfv0p8aiea02trekm4lriprc2u0d8.apps.googleusercontent.com" >
       <Login/>
    </GoogleOAuthProvider>
  )
}

function App() {
  return (
      <Routes>
        <Route element={<WithNavbarLayout/>}>
           <Route path="/" element={<Home/>} />
        </Route>
        <Route element={<WithoutNavbarLayout/>}>
          <Route path="/signin" element={<Googlewrapper/>}/>
          <Route path="/details" element={<Deatils/>} />  
        </Route>
      </Routes>
  );
}

export default App;
