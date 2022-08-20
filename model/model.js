const mongoose=require("mongoose");
const jwt=require("jsonwebtoken")

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    cpassword:{
        type:String,
        required:true,
    },
    tokens:
        [
            {
            token: {
                type:String,
                required:true,
                   }
            }
        ]
    


})


const bcrypt=require("bcrypt");
userSchema.pre("save",async function(next){
    
    if(this.isModified("password")){
        this.password=await bcrypt.hash(this.password,12);
        this.cpassword=await bcrypt.hash(this.cpassword,12);
    }
    next();

})



userSchema.methods.generateToken= async function(){
     let token=await jwt.sign({_id:this._id},process.env.SECRET);
this.tokens=this.tokens.concat({token:token});
this.save();
return token;
}
const Register=new mongoose.model("Register",userSchema);
module.exports=Register;