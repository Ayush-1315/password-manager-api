const express=require('express');
const userRouter=express.Router();

const {signupService,loginService}=require('../controllers/userControllers.controller');
const { validateSignupMiddleware,validateLoginMiddleware} = require('../middlewares/users.middleware');

//POST Requests

userRouter.post('/user',validateSignupMiddleware,signupService);
userRouter.post('/login',validateLoginMiddleware,loginService);

module.exports={userRouter};