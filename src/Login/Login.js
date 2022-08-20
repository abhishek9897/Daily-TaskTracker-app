import React from 'react'
import "./login.css"
import {useNavigate} from "react-router-dom"
import {useState} from "react";
function Login() {
   const[email,setEmail]=useState("");
   const [password,setPassword]=useState("");

  const navigate=useNavigate();

 
async function Login(e){
  e.preventDefault();
  const res=await fetch("/login",{
    method:"post",
    headers:{
      "Content-Type":"application/json",
      "Accept":"application/json",
    },
    body:JSON.stringify({email,password}),
  })
  
  if(res){
    if(res.status===401 || res.status===403){
      window.alert("invalid Credentials, You Haven't signed-up or you are filling the data Incorrectly!");
    }
    else if(res.status===200){
      window.alert("login Successful")
      navigate("/")
    }

  }
}
function signup(e){
e.preventDefault();

navigate("/signup")
}


  return (
   <div>
    <div className='header'>
      <button class="btn btn-primary" onClick={signup}>Signup</button>
    </div>
    <div className="login">
     
        <div className="login_form">
      <h1 class="Heading">Login</h1>
        <form method='post'>
         
  <div class="form-group">
    <label className='labels' for="exampleInputEmail1">Email address</label>
    <input  type="email" name='email' value={email} onChange={(e)=>setEmail(e.target.value)}class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
      </div>
  <div class="form-group">
    <label  className='labels' for="exampleInputPassword1">Password</label>
    <input type="password" name='password ' value={password} onChange={(e)=>setPassword(e.target.value)} class="form-control" id="exampleInputPassword1" placeholder="Password"/>
  </div>
  
  <button className='btn1' onClick={Login}type="submit" class="btn btn-primary">Submit</button>
</form>
        </div>
    </div></div>
  )
}

export default Login