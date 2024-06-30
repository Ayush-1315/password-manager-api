const express = require("express");
const masterRouter = express.Router();

const {
  deleteUserController,
  adminDashboardController,
  viewUserAccountController,
  getAllUserPasswordController,
  getUserPasswordController,
  resetUserPasswordController,
  adminExpiringAccountsController,
  toggleLastAccessedController,
} = require("../controllers/masterController.controller");

masterRouter.delete("/delete-user/:id", deleteUserController);
masterRouter.get("/dashboard/:id", adminDashboardController);
masterRouter.get("/user/:id", viewUserAccountController);
masterRouter.get("/user/:id/:accountId", getAllUserPasswordController);
masterRouter.get("/user-password/:id", getUserPasswordController);
masterRouter.get("/accounts/:id", adminExpiringAccountsController);
masterRouter.post("/reset-password/:id", resetUserPasswordController);
masterRouter.put("/last-accessed/:id/:passId", toggleLastAccessedController);
module.exports = masterRouter;
