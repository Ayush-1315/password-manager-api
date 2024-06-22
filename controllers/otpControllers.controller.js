const {otpGenerator,storeOtp}=require('../utils/otpManager');
const {transporter,userDeleteMailOptions, userDeletedMailOptions, welcomeMailOptions}=require('../utils/mailManager');

const deleteUserOTP=(req,res)=>{
    const {email}=req.body;
    const {username}=req.body
    const newOtp=otpGenerator();
    storeOtp(username,email,newOtp);

    transporter.sendMail(userDeleteMailOptions(email,newOtp),(error,info)=>{
        if(error){
            console.log(`Error sending email: ${error}`)
            res.status(500).json({message:'Error sending email'})
        }
        else{   
            console.log(`Email sent: ${info.response}`)
            res.status(200).json({message:'OTP Sent successfully'});
        }
    })
}

// User deleted validation
const userDeleted=(email)=>{
    transporter.sendMail(userDeletedMailOptions(email),(error,info)=>{
        if(error){
            console.log(`Error sending email: ${error}`)
            res.status(500).json({message:'Error sending email'})
        }
        else{   
            console.log(`Email sent: ${info.response}`)
        }
    })
}
// Wlecome Mail
const welcomeToServer=(email)=>{
    transporter.sendMail(welcomeMailOptions(email),(error,info)=>{
        if(error){
            console.log(`Error sending email: ${error}`)
            res.status(500).json({message:'Error sending email'})
        }
        else{   
            console.log(`Email sent: ${info.response}`)
        }
    })
}
module.exports={deleteUserOTP,userDeleted,welcomeToServer}
