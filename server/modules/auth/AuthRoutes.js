const { Login, GetOTP, VerifyOTP, ResetPassword } = require("./AuthController");

const AuthRoutes = require("express").Router();

AuthRoutes.post("/login", Login);
AuthRoutes.post("/get-otp", GetOTP); // Auth
AuthRoutes.post("/verify-otp", VerifyOTP); // Auth
AuthRoutes.post("/reset-password", ResetPassword); // Auth

module.exports = AuthRoutes;
