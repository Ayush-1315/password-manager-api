const express=require('express');
const userRouter=express.Router();

const {signupService,loginService, userDeleteService}=require('../controllers/userControllers.controller');
const { validateSignupMiddleware,validateLoginMiddleware, deleterUserMiddleware} = require('../middlewares/users.middleware');
const { tokenValidatorMiddleware } = require('../middlewares/auth.middleware');
const { OTPValidationMiddleware,requestToDeleteUserOTP} = require('../middlewares/otpValidation.middleware');
const {deleteUserOTP}=require("../controllers/otpControllers.controller");

//POST Requests
userRouter.post('/signup',validateSignupMiddleware,signupService);
userRouter.post('/login',validateLoginMiddleware,loginService);

//OTP Verification for user deletion
userRouter.post('/delete-user',tokenValidatorMiddleware,requestToDeleteUserOTP,deleteUserOTP);

//DELETE Routes
userRouter.delete("/authorize-delete/:id",tokenValidatorMiddleware,OTPValidationMiddleware,deleterUserMiddleware,userDeleteService)
module.exports={userRouter};