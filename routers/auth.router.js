const express=require('express');
const userRouter=express.Router();

const {signupService,loginService, userDeleteService, forgotPasswordController, sendOTPforgotPassword}=require('../controllers/userControllers.controller');
const { validateSignupMiddleware,validateLoginMiddleware, deleterUserMiddleware, validateAndUpdateForgottenPasswordMiddleware} = require('../middlewares/users.middleware');
const { tokenValidatorMiddleware } = require('../middlewares/auth.middleware');
const { OTPValidationMiddleware,requestToDeleteUserOTP, forgotPasswordRequest} = require('../middlewares/otpValidation.middleware');
const {deleteUserOTP}=require("../controllers/otpControllers.controller");

//POST Requests
userRouter.post('/signup',validateSignupMiddleware,signupService);
userRouter.post('/login',validateLoginMiddleware,loginService);

//OTP Verification for user deletion
userRouter.post('/send-delete-otp',tokenValidatorMiddleware,requestToDeleteUserOTP,deleteUserOTP);
userRouter.post('/forgot-password/send-otp',forgotPasswordRequest,sendOTPforgotPassword);

userRouter.post('/reset-password',OTPValidationMiddleware,validateAndUpdateForgottenPasswordMiddleware,forgotPasswordController)
//DELETE Routes
userRouter.delete("/authorize-delete/:id",tokenValidatorMiddleware,OTPValidationMiddleware,deleterUserMiddleware,userDeleteService)
module.exports={userRouter};