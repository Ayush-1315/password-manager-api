const express=require('express');
const passwordRouter=express.Router();

const {addPasswordToUserService, getPasswordInfoService, getAllPasswordsService}=require("../controllers/passwordController.controller");
const { tokenValidatorMiddleware } = require('../middlewares/auth.middleware');
const { validateNewPasswordCredentialsMiddleware, validateGetAccountInfoMiddleware, validateGetAllPasswordsMiddleware } = require('../middlewares/password.middleware');

//POST Requests
passwordRouter.post("/add-password/:id",tokenValidatorMiddleware,validateNewPasswordCredentialsMiddleware,addPasswordToUserService)
//GET Requests
passwordRouter.get("/password/:id/:passId",tokenValidatorMiddleware,validateGetAccountInfoMiddleware,getPasswordInfoService)
passwordRouter.get("/:id",tokenValidatorMiddleware,validateGetAllPasswordsMiddleware,getAllPasswordsService)
passwordRouter
module.exports=passwordRouter;