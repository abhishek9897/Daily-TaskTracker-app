const express= require("express");
const mongoose=require("mongoose");
const app= express();
const Register=require("./model/model");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")



const path=require("path");
const dotenv=require("dotenv");
dotenv.config({path:"./config.env"})


const port= process.env.PORT || 8080;

const DB=process.env.DATABASE;
if(mongoose.connect(DB))
{
    console.log("successful connected to database");
}

const cookieParser = require('cookie-parser')
app.use(cookieParser())


app.use(express.json({extendede:false}));
app.use(express.urlencoded());
app.post("/login",async(req,res)=>{
    const {email,password}=req.body;
  
    if(!email || !password){
        return res.status(403).send("Fill all the fields");
    }

 const check=await Register.findOne({email:email});
 
 if(!check){
   return res.status(401).send("No user is Found, SignUp first");

 }
    const pass= await bcrypt.compare(password,check.password);
   
 if(!pass){
 return res.status(401).json("invalid credentails");
 }
 const token=await check.generateToken();
 res.cookie("jwt",token,{
    expires: new Date(Date.now()+30000000),
    httpOnly:true
})
  res.status(200).json("successful");
})


app.post("/signup",async(req,res)=>{
   
    const {name,email,password,cPassword}=req.body;
   console.log(req.body);
    if(!name || !email || !password || !cPassword){
        return res.status(403).send("Fill all the fields");
    }
    if(cPassword!=password){
        return res.status(402).send("password is'nt Matching");
    }

    const check=await Register.findOne({email:email});
    if(!check){
        const user=new Register({name:name,email:email,password:password,cpassword:cPassword});
        
        const done=await user.save();
        if(done){
            res.status(200).json("successful")
        }else{
            res.send("not Successful")
        }
        
    }else{
        res.status(401).json("User already exists");
    }
  
})



const Authenticate=async (req,res,next)=>{ 
    try{
      
       const token=req.cookies.jwt;
       if(!token){ return res.status(400).send({message:"no access"})};
       
        const verifyToken=jwt.verify(token,process.env.SECRET);
        const user= await Register.findOne({_id:verifyToken._id,"tokens.token":token})
    
        if(user){
            req.user=user;
            next();
        }
    }
    catch(err){
        console.log(err)
        res.status(400).send("error");
    }
   
   

}



app.get("/about",Authenticate,(req,res)=>{
    console.log(req.user.email)
    console.log("your are in todoList page!")
})



 





app.listen(port,()=>{
    console.log(`app is runnnig at  ${port}`);
})