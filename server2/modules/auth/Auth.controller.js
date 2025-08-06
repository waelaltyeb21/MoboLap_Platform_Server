const { GetOneDoc, UpdateDoc } = require("../../lib/CrudOperations");
const { Compare, Encrypt } = require("../../services/Encryption");
const GenerateTokens = require("../../services/GenerateTokens");
const { SendMail } = require("../../services/SendMail");
const SupervisorModel = require("../supervisors/Supervisor.model");

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
    await SendMail(
      email,
      "Account Login Notification",
      `Hello ${req.user?.name || "There"},

      We noticed a new login to your MoboLap Store account.

      If this was you, no action is needed. If not, we recommend changing your password immediately for security.

      Thank you,  
      MoboLap Store System`
    );
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
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: "None",
        path: "/",
        signed: true,
        domain: ".vercel.app",
      })
      .cookie("refreshtoken", RefreshToken, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        httpOnly: true,
        secure: true,
        sameSite: "None",
        path: "/",
        signed: true,
        domain: ".vercel.app",
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
    await SendMail(
      email,
      "OTP Verifection Code",
      `<div>
      <p>Hello ${req.user?.name || "There"},</p>
      
      <p>OTP: <strong>${123456}</strong></p>
      <p>Expires in: <strong>5 minutes</strong></p>
      
      <p>If this was you, no action is needed. If not, we recommend changing your password immediately for security.</p>

      <p>Regards,<br />MoboLap Store System</p>
    </div>`
    );
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
    await SendMail(
      supervisor.email,
      "Password Change",
      `<div>
      <p>Hi ${supervisor.name},</p>

      <p>Your MoboLap Store account password was successfully changed.</p>

      <p>If you did not perform this action, please contact our support team immediately.</p>

      <p>
        Stay safe,<br />
        MoboLap Store System
      </p>
    </div>`
    );
    return res
      .status(200)
      .json({ message: "Password Has Been Change Successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { Login, GetOTP, VerifyOTP, ResetPassword };
