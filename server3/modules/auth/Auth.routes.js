const { isAuthenticated } = require("../../middlewares/Auth");
const {
  Login,
  HandleRefreshToken,
  GetOTP,
  VerifyOTP,
  ResetPassword,
} = require("./Auth.controller");

const AuthRoutes = require("express").Router();

AuthRoutes.post("/login", Login);
AuthRoutes.post("/refresh-token", HandleRefreshToken);
AuthRoutes.post("/get-otp", isAuthenticated, GetOTP); // Auth
AuthRoutes.post("/verify-otp", isAuthenticated, VerifyOTP); // Auth
AuthRoutes.post("/reset-password", isAuthenticated, ResetPassword); // Auth

module.exports = AuthRoutes;
