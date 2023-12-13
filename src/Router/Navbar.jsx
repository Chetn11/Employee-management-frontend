import React, { useContext, useState } from 'react'
import {AuthContext} from "../context/AuthContext"
import { Link } from 'react-router-dom'

function Navbar() {
    const {providerState}=useContext(AuthContext);
  return (
    <div style={{display:"flex", justifyContent:"center",gap:"50px"}}>
      <Link to="/dashboard">Employee Management</Link>
      {providerState.state.isAuth?<button onClick={()=>providerState.logout()}>Logout</button>:<Link to="/">Login/Signup</Link>}
      
    </div>
  )
}

export default Navbar