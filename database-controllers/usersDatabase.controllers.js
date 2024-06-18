const User=require('../models/user.model');

//User SignUp on database
const userSignupService=async(userData)=>{
    const newUser=new User(userData)
    try{
        const savedData=await newUser.save();
        return savedData
    }catch(e){
        throw e
    }
}

module.exports={userSignupService}