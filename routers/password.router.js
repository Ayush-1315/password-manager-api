const express=require('express');
const passwordRouter=express.Router();

const {addPasswordToUserService, getPasswordInfoService, getAllPasswordsService, getSearchedPasswordsService, updatePasswordService}=require("../controllers/passwordController.controller");
const { tokenValidatorMiddleware } = require('../middlewares/auth.middleware');
const { validateNewPasswordCredentialsMiddleware, validateGetAccountInfoMiddleware, validateGetAllPasswordsMiddleware, validateSearchPasswords, validatePasswordUpdateMiddleware } = require('../middlewares/password.middleware');

//POST Requests
passwordRouter.post("/add-password/:id",tokenValidatorMiddleware,validateNewPasswordCredentialsMiddleware,addPasswordToUserService);
passwordRouter.post("/update-password/:id",tokenValidatorMiddleware,validatePasswordUpdateMiddleware,updatePasswordService)
//GET Requests
passwordRouter.get("/password/:id/:passId",tokenValidatorMiddleware,validateGetAccountInfoMiddleware,getPasswordInfoService)
passwordRouter.get("/password/:id",tokenValidatorMiddleware,validateSearchPasswords,getSearchedPasswordsService)
passwordRouter.get("/:id",tokenValidatorMiddleware,validateGetAllPasswordsMiddleware,getAllPasswordsService);
module.exports=passwordRouter;