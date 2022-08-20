import React from 'react'
import "./signup.css"
import {useState} from "react"
import {useNavigate} from "react-router-dom";

function Signup() {
  const navigate=useNavigate();
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");

    const [password,setPassword]=useState("");


    
    const [cPassword,setConfirmpassword]=useState("");
    
async function submit(e){
e.preventDefault();
const resu= await fetch('/signup',{
    method:"post",
     Accept:{"Content-Type": "application/json"},
    headers:{"Content-Type": "application/json"},
    body: JSON.stringify({name,email,password,cPassword}),
})
if(resu.status===401){
  window.alert("User already exists, Please Login")
  navigate("/login");
}else if(resu.status===402){
  window.alert("Password Is'nt Matching!");
}else if(resu.status===403){
  window.alert("Fill all the Credentials");

}else{
  window.alert("user Successfully Signed-up");
  navigate("/login")
}




 }
    

  return (
    <div className="Signup">
     
    <div className="signup-form">
    <h3 className='Heading'> Signup</h3>
    <form method="post"  >
  
    <div class="form-group">
<label className='labels' for="exampleInputName1">Name</label>
<input className='signup-input'  type="text" name='name' value={name} onChange={(e)=>setName(e.target.value)}class="form-control" id="exampleInputName1" aria-describedby="nameHelp" placeholder="Enter Name"/>
</div>
<div class="form-group">
<label className='labels' for="exampleInputEmail1">Email address</label>
<input className='signup-input'  type="email" name='email' value={email} onChange={(e)=>setEmail(e.target.value)}class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
</div> 
    
<div class="form-group">
<label className='labels' for="exampleInputPassword1">Password</label>
<input className='signup-input' type="password" name='password ' value={password} onChange={(e)=>setPassword(e.target.value)} class="form-control" id="exampleInputPassword1" placeholder="Password"/>
</div>
<div class="form-group">
<label className='labels' for="exampleInputcPassword1">Confirm Password</label>
<input  className='signup-input' type="password" name='cpassword ' value={cPassword} onChange={(e)=>setConfirmpassword(e.target.value)} class="form-control" id="exampleInputPassword2" placeholder="Confirm password"/>
</div>

<button type="submit" onClick={submit} class="btn btn-primary">Submit</button>
   

</form>
</div>
</div>
  )

  }
export default Signup