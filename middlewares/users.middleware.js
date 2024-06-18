// Signup credential Validator

const validateSignupMiddleware=(req,res,next)=>{
    const {username, password,email}=req.body;
    if(username,email,password){
        if(email.includes('.com')&&email.includes('@'))
            if(password.length>=8) 
                next();
            else 
            res.status(400).json({message:'Password should be of 8 characters minimum'})
        else
        res.status(400).json({message:'Enter a valid email address'})
    }
    else{
        res.status(400).json({message:'Username, Email and Password are minimum required fields'})
    }
}

module.exports={
    validateSignupMiddleware
}