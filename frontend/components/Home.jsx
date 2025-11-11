import React from 'react'
import axios from "axios"
import { useContext,useEffect  } from 'react'
import { Context } from "../context/context";
import { useState } from 'react';

const Home = () => {
  const {id,token} = useContext(Context)
  const [name,setname] = useState()

  return (
    <div>
     


    </div>
    
  )
}

export default Home