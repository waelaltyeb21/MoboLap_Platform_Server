const { GetOneDoc, UpdateDoc } = require("../../lib/CrudOperations");
const { Compare, Encrypt } = require("../../services/Encryption");
const GenerateTokens = require("../../services/GenerateTokens");
const SupervisorModel = require("../supervisors/SupervisorModel");

const OTPs = [];

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const supervisor = await GetOneDoc(SupervisorModel, { email });

    if (!supervisor)
      return res
        .status(400)
        .json({ message: "This Email Is Not Sign With Any User" });

    // Match The Password With The hashed One Saved On The DATABASE
    const isMatch = await Compare(password, supervisor.password);

    if (!isMatch)
      return res.status(400).json({ message: "Wrong Email Or Password" });

    // Send Email To Notify The User

    // Generate Token
    const Token = GenerateTokens.accessToken({
      id: supervisor._id,
      name: supervisor.name,
      role: supervisor.role,
    });

    const RefreshToken = GenerateTokens.refreshToken({
      id: supervisor._id,
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
        // domain:
        //   process.env.NODE_ENV === "development" ? "localhost" : "MyDomain.com",
      })
      .cookie("refreshtoken", RefreshToken, {
        maxAge: 900000, // 15 minutes in milliseconds
        // httpOnly: true, // Prevents client-side JS access
        // secure: true, // Only sent over HTTPS
        sameSite: "strict", // Helps prevent CSRF
        path: "/", // Cookie path
        signed: true, // Sign the cookie (use with secret)
        // domain:
        //   process.env.NODE_ENV === "development" ? "localhost" : "MyDomain.com",
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
    // Email From Request
    const { email } = req.body;

    console.log("Email From Request: ", req.user?.email);

    // Generate The OTP Code
    let OTP = "";

    for (let i = 0; i < 6; i++) {
      OTP += Math.floor(Math.random() * 10);
    }

    // Save It Temperory In Array
    OTPs.push({
      email: email,
      otp: parseInt(OTP),
      expireAt: Date.now() + 5 * 60 * 1000,
    });

    // Send The OTP To Supervisor Email

    return res.status(200).json({ otp: parseInt(OTP) });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const VerifyOTP = async (req, res) => {
  try {
    // Email From Request
    const { email, otp } = req.body;

    const CheckOTP = OTPs.find(
      (OTP_Code) => OTP_Code.otp === parseInt(otp) && OTP_Code.email === email
    );

    if (!CheckOTP) return res.status(400).json({ message: "Invalid OTP Code" });

    const IsValidOTP = Date.now() < CheckOTP.expireAt;

    if (!IsValidOTP)
      return res.status(400).json({ message: "Out Dated OTP Code" });

    return res.status(200).json({ message: "You Can Set New Password" });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const ResetPassword = async (req, res) => {
  try {
    const { id, password, confirmPassword } = req.body;

    // const GetIDFromRequest = req?.user?.id;

    // console.log("ID From Request: ", GetIDFromRequest);

    if (!password || !confirmPassword || password !== confirmPassword)
      return res.status(400).json({ message: "Password Doesn't Match" });

    const HashedPassword = await Encrypt(password);

    const supervisor = await UpdateDoc(SupervisorModel, id, {
      password: HashedPassword,
    });

    if (!supervisor)
      return res.status(400).json({ message: "Faild To Change Password" });

    // Send Email To Notify The Supervisor With Password Change

    return res
      .status(200)
      .json({ message: "Password Has Been Change Successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { Login, GetOTP, VerifyOTP, ResetPassword };
