const bcrypt = require("bcrypt");

const User = require("../models/user.model");
const validatePassword = require("../utils/decryptPassword");

//User SignUp on database
const userSignupService = async (userData) => {
  const newUser = new User(userData);
  try {
    const savedData = await newUser.save();
    return savedData;
  } catch (e) {
    throw e;
  }
};

//User Login on database
const userLoginService = async (user, password) => {
  try {
    const userData = await User.findOne({
      $or: [{ username: user }, { email: user }],
    });
    if (userData) {
      // const isValidPassword=await bcrypt.compare(password,userData.password)
      const isValidPassword = await validatePassword(
        password,
        userData.password
      );
      if (isValidPassword) return userData;
      else return false;
    } else {
      return null;
    }
  } catch (e) {
    throw e;
  }
};
//const User Delete
const deleteUserService = async (username, password, id, email) => {
  try {
    const foundUser = await User.findOne({ username });
    if (foundUser && foundUser.email === email) {
      const isPasswordValid = await validatePassword(
        password,
        foundUser.password
      );
      if (isPasswordValid) {
        const deletedUser = await User.findByIdAndDelete(id);
        return deletedUser;
      } else {
        return false;
      }
    } else {
      return null;
    }
  } catch (e) {
    throw e;
  }
};

//Update password with username or email
const forgotPasswordService = async (user,newPassword) => {
  try {
    const foundUser = await User.findOne({
      $or: [{ username: user }, { email: user }],
    });
    if(foundUser){
      Object.assign(foundUser,{password:newPassword});
      const updatedUser=foundUser.save();
      return updatedUser;
    }
    else{
      const error=new Error('User does not exist');
      error.status=404;
      throw error;
    }
  } catch (e) {
    throw e;
  }
};
// Find user by username or email
const findUser=async(user)=>{
  try{
    const foundUser = await User.findOne({
      $or: [{ username: user }, { email: user }],
    });
    if(foundUser){
      return foundUser;
    }
    else{
      const error=new Error('User does not exist');
      error.status=404;
      throw error;
    }
  }catch(e){
    throw e;
  }
}
module.exports = { userSignupService, userLoginService, deleteUserService,forgotPasswordService,findUser};
