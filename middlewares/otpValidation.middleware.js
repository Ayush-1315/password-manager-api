const OTPValidationMiddleware=(req,res,next)=>{
    const otp=req.body.otp?.trim();
    if(otp.length===6)
        next();
    else
        res.status(400).json({message:'Invalid OTP'});
}
const requestToDeleteUserOTP=(req,res,next)=>{
    const email=req.body.email?.trim();
    const username=req.body.username?.trim();
    if(email,username)
        next();
    else
        res.status(400).json({message:"Please provide username and registered email"})
}

module.exports={
    OTPValidationMiddleware,
    requestToDeleteUserOTP
}