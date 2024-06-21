const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const secret = process.env.SECRET;

const {
  userSignupService,
  userLoginService,
  deleteUserService,
} = require("../database-controllers/usersDatabase.controllers");

const {verifyOtp}=require('../utils/otpManager')
//Signup service

const signupService = async (req, res) => {
  const newUserData = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newUserData.password, salt);
    const newUser = await userSignupService({
      ...newUserData,
      password: hashedPassword,
    });
    const token = jwt.sign(
      { username: newUser.username, id: newUser._id },
      secret,
      { expiresIn: "2h" }
    );
    res.status(201).json({
      message: "User created successfully",
      data: {
        token,
        user: {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email,
        },
      },
    });
  } catch (e) {
    if (e.code === 11000 && e.keyPattern.email)
      res.status(409).json({ message: "Email already exists" });
    else if (e.code === 11000 && e.keyPattern.username)
      res.status(409).json({ message: "Username exists" });
    else res.status(500).json({ message: "Internal Server Error" });
  }
};

//Login Service

const loginService = async (req, res) => {
  const { user, password } = req.body;
  try {
    const userData = await userLoginService(user.trim(), password.trim());
    if (userData !== null && userData !== false) {
      {
        const token = await jwt.sign(
          { username: userData.username, id: userData._id },
          secret,
          { expiresIn: "2h" }
        );
        res.status(200).json({
          message: "User Found",
          data: {
            token,
            user: {
              id: userData._id,
              username: userData.username,
              email: userData.email,
            },
          },
        });
      }
    } else if (userData === null)
      res.status(404).json({ message: "User not found" });
    else res.status(401).json({ message: "Unauthorized Access" });
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
};

//Delete user service

const userDeleteService = async (req, res) => {
  const { username, password,email,otp } = req.body;
  const id=req.params.id;

  try {
    if(verifyOtp(username,otp)){
      const deleteUser = await deleteUserService(username, password, id,email);
    if (deleteUser) {
      res.status(200).json({
        message: "Account deleted",
        data: {
          id: deleteUser._id,
          username: deleteUser.username,
          email:deleteUser.email,
        },
      });
    } else if (deleteUser === null) {
      res.status(404).json({ message: "User not found !" });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
    }
  } catch (e) {

    switch (e.status) {
      case 400: res.status(400).json({message:'Invalid OTP'})
        break;
      
      case 403: res.status(403).json({message:'OTP Expired'})
    
      default:res.status(500).json({message:'Internal server error'})
        break;
    }
  }
};
module.exports = { signupService, loginService, userDeleteService };
