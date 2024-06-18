const express=require('express');
const userRouter=express.Router();

const {signupService}=require('../controllers/userControllers.controller');
const { validateSignupMiddleware } = require('../middlewares/users.middleware');

//POST Requests

userRouter.post('/user',validateSignupMiddleware,signupService)

module.exports={userRouter};