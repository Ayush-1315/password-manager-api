const randomString=require('randomstring');

const otps=[];
//OTP Generator 
const otpGenerator=()=>randomString.generate({
    length:6,
    charset:'numeric'
})

//Storing OTP
const storeOtp=(email,otp)=>{
    const newOtp={
        email,
        otp,
        expiry:Date.now()+180000,// Valid for 3 minutes
    }
    const emailIndex=otps.findIndex((ele)=>ele.email===email);
    if(emailIndex!==-1){
        otps[emailIndex]=newOtp;
    }else{
        otps.push(newOtp);
    }
}

// Verifying OTP
const verifyOtp=(email,otp)=>{
    const entry=otps.find(ele=>ele.email===email && ele.otp===otp)
    if(entry){
        if(entry.expiry-Date.now()>0){
            otps.splice(otps.indexOf(entry),1);
            return true;
        }
        else{
            otps.splice(otps.indexOf(entry),1);
            throw new Error({
                status:403,
                message:'OTP Expired'
            })
        }
    }
    else{
        throw new Error({
            status:400,
            message:'Invalid OTP'
        })
    }
}
module.exports={
    otpGenerator,
    storeOtp,
    verifyOtp
}