const bcrypt=require('bcrypt');
const validatePassword=async(requestedPassword, dbPassword)=>{
    try{
        const isValid=await bcrypt.compare(requestedPassword,dbPassword);
        return isValid
    }catch(e){
        throw new Error(e)
    }
}
module.exports= validatePassword