const { GetOneDoc } = require("../../lib/CrudOperations");
const { Compare } = require("../../services/Encryption");
const GenerateTokens = require("../../services/GenerateTokens");
const SupervisorModel = require("../supervisors/SupervisorModel");

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const supervisor = await GetOneDoc(SupervisorModel, { email });

    console.log("supervisor: ", supervisor);

    if (!supervisor)
      return res
        .status(400)
        .json({ message: "This Email Is Not Sign With Any User" });

    // Match The Password With The hashed One Saved On The DATABASE
    const isMatch = Compare(password, supervisor.password);

    console.log("isMatch: ", isMatch);

    if (!isMatch)
      return res.status(400).json({ message: "Wrong Email Or Password" });

    // Generate Token
    const Token = GenerateTokens.accessToken({
      name: supervisor.name,
      role: supervisor.role,
    });

    const RefreshToken = GenerateTokens.refreshToken({
      name: supervisor.name,
      role: supervisor.role,
    });

    return res
      .status(200)
      .cookie("token", Token, {
        maxAge: 1000 * 60 * 30, // 30 minutes
        // httpOnly: true, // Prevents client-side JS access
        // secure: true, // Only sent over HTTPS
        sameSite: "strict", // Helps prevent CSRF
        path: "/", // Cookie path
        signed: true, // Sign the cookie (use with secret)
        domain:
          process.env.NODE_ENV === "development" ? "localhost" : "MyDomain.com",
      })
      .cookie("refreshtoken", RefreshToken, {
        maxAge: 900000, // 15 minutes in milliseconds
        // httpOnly: true, // Prevents client-side JS access
        // secure: true, // Only sent over HTTPS
        sameSite: "strict", // Helps prevent CSRF
        path: "/", // Cookie path
        signed: true, // Sign the cookie (use with secret)
        domain:
          process.env.NODE_ENV === "development" ? "localhost" : "MyDomain.com",
      })
      .json({ message: "LogedIn Successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err });
  }
};

const GetOTP = async (req, res) => {
  try {
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const VerifyOTP = async (req, res) => {
  try {
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const ResetPassword = async (req, res) => {
  try {
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports = { Login, GetOTP, VerifyOTP, ResetPassword };
