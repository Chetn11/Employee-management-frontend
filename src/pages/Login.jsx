import React, { useContext, useState } from 'react'
import {AuthContext} from "../context/AuthContext"
import { useNavigate } from 'react-router-dom';

function Login() {

  const[toggle,setToggle]=useState(false);
  
  const [email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const[confirm_password,setConfirm_Password]=useState("");
  const {providerState}=useContext(AuthContext);
  const navigate=useNavigate();

const handelSignup= async (e)=>{
  e.preventDefault();
  const payload={
    email:email,
    password:password,
    confirm_password:confirm_password
  }

  fetch(`https://defiant-jade-blackbuck.cyclic.app/signup`,{
    method:"POST",
    body:JSON.stringify(payload),
    headers:{
      'Content-Type':'application/json'
    }
  }).then((res)=>res.json()).then((res)=>{
    console.log(res);
   
  
  }).catch((err)=>console.log(err));
  console.log("signup");
  
  alert("Signup completed got to login page")
}


const handelLogin= async (e)=>{
  e.preventDefault()
  const payload={
    email,
    password
  }
  
  fetch(`https://defiant-jade-blackbuck.cyclic.app/login`,{
    method:"POST",
    body:JSON.stringify(payload),
    headers:{
      'Content-Type':'application/json'
    }
  }).then((res)=>res.json()).then((res)=>{
    console.log(res);
    if(res.token){
      providerState.login(res.token);
      localStorage.setItem("token",res.token);
    }
  
  }).catch((err)=>console.log(err));
  console.log("login");
  setEmail("");
  setPassword("");
  console.log(providerState)
 
  alert("Login Completed")
}
if(providerState.state.isAuth)
{
  navigate("/dashboard");
}
  return (
    <div className='container'>
      <h3>Signup</h3>
      <div className='btn'>
        <button onClick={()=>setToggle(!toggle)}>Login</button>
        <button onClick={()=>setToggle(!toggle)}>Signup</button>
      </div>

      {toggle?<form style={{display:"flex", flexDirection:"column", width:"300px", margin:"auto", gap:"30px", padding:"30px"}}>
        <input type='email' placeholder='Enter Your Email' onChange={(e)=>setEmail(e.target.value)}/>
        <input type='text' placeholder='Enter Your Password' onChange={(e)=>setPassword(e.target.value)}/>
        <input type='text' placeholder='Enter Password again' onChange={(e)=>setConfirm_Password(e.target.value)}/>
        <input type='submit' value="Signup" onClick={handelSignup}/>
      </form>:<form style={{display:"flex", flexDirection:"column", width:"300px", margin:"auto", gap:"30px", padding:"30px"}}>
        <input type='email' placeholder='Enter Your Email' onChange={(e)=>setEmail(e.target.value)}/>
        <input type='text' placeholder='Enter Your Password' onChange={(e)=>setPassword(e.target.value)}/>
        <input type='submit' value="Login" onClick={handelLogin}/>
      </form>}
      
      
    </div>
  )
}

export default Login
