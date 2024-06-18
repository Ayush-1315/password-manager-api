const bcrypt=require('bcrypt')

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

//User Login on database
const userLoginService=async(user,password)=>{
    try{
        const userData=await User.findOne({$or:[{username:user},{email:user}]});
        if(userData)
            {
                const isValidPassword=await bcrypt.compare(password,userData.password)
                if(isValidPassword)
                    return(userData)
                else
                    return false
            }
            else{
                return null;
            }
        
    }catch(e){
        throw e
    }
}
module.exports={userSignupService,userLoginService}