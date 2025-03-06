//Import:
import nodemailer from "nodemailer";
import dotenv from "dotenv";
//Config:
dotenv.config();
const user = process.env.gmailAddress;
const pass = process.env.gmailPassword;
const mailConfig = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465, // true for port 465, false for other ports
  secure: true,
  auth: {
    user,
    pass,
  },
});

//Main Logic:
const sendMail = async (type, recipient, otpValue) => {
  try {
    if (type === "userCreate") {
      const info = await mailConfig.sendMail({
        from: '"Jotterly" <shubhamkadariya@gmail.com>',
        to: recipient,
        subject: "Welcome To Application! 📝",
        html: `<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; line-height: 1.6;">
  <div style="background-color: #f9f9f9; border-radius: 5px; padding: 20px; border: 1px solid #ddd;">
    <div style="text-align: center; margin-bottom: 20px;">
      <h1 style="color: #4a6ee0; margin: 0;">Jotterly</h1>
      <p style="color: #666; margin-top: 5px;">Your ideas, organized beautifully</p>
    </div>
    <h2 style="color: #333;">Welcome to Jotterly!</h2>
    <p>Hi ${recipient},</p>
    <p>Thank you for joining Jotterly, your new favorite note-taking application! Before you can start using all our features, please verify your email.</p>
    <div style="background-color: #f0f4ff; padding: 15px; text-align: center; margin: 20px 0; border-radius: 5px;">
      <p style="margin: 0 0 10px 0;">Your verification code is:</p>
      <p style="font-size: 24px; font-weight: bold; letter-spacing: 5px; color: #4a6ee0; margin: 0;">${otpValue}</p>
    </div>
    <p><strong>Note:</strong> You must verify your email to access Jotterly's features.</p>
    <p>With Jotterly, you can:</p>
    <ul style="padding-left: 20px;">
      <li>Create and organize notes with rich formatting</li>
      <li>Access your notes from any device, anytime</li>
      <li>Keep your information secure</li>
    </ul>
    <div style="text-align: center; margin: 25px 0;">
      <a href="http://localhost:5173/verify" style="background-color: #4a6ee0; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Verify My Email</a>
    </div>
    <p>Happy note-taking!<br>The Jotterly Team</p>
    <div style="margin-top: 30px; font-size: 12px; color: #999; text-align: center; border-top: 1px solid #ddd; padding-top: 15px;">
      <p>This is an automated message. Please do not reply to this email.</p>
      <p>&copy; 2025 Jotterly. All rights reserved.</p>
    </div>
  </div>
</body>`,
      });
      console.log("Email Sent: %s", info.messageId);
      return true; //Success
    } else {
      const info = await mailConfig.sendMail({
        from: '"Jotterly" <shubhamkadariya@gmail.com>',
        to: recipient,
        subject: "Reset Your Password! 🔑",
        html: `<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; line-height: 1.6;">
      <div style="background-color: #f9f9f9; border-radius: 5px; padding: 20px; border: 1px solid #ddd;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #4a6ee0; margin: 0;">Jotterly</h1>
          <p style="color: #666; margin-top: 5px;">Your ideas, organized beautifully</p>
        </div>
        <h2 style="color: #333;">Reset Your Password!</h2>
        <p>Hi ${recipient},</p>
        <p>Thank you for joining Jotterly, your new favorite note-taking application! Please Use This Code To Reset Your Password.</p>
        <div style="background-color: #f0f4ff; padding: 15px; text-align: center; margin: 20px 0; border-radius: 5px;">
          <p style="margin: 0 0 10px 0;">Your reset code is:</p>
          <p style="font-size: 24px; font-weight: bold; letter-spacing: 5px; color: #4a6ee0; margin: 0;">${otpValue}</p>
        </div>
        <p><strong>Note:</strong> You must verify your email to access Jotterly's features.</p>
        <p>With Jotterly, you can:</p>
        <ul style="padding-left: 20px;">
          <li>Create and organize notes with rich formatting</li>
          <li>Access your notes from any device, anytime</li>
          <li>Keep your information secure</li>
        </ul>
        <div style="text-align: center; margin: 25px 0;">
          <a href="http://localhost:5173/verify" style="background-color: #4a6ee0; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset My Password</a>
        </div>
        <p>Happy note-taking!<br>The Jotterly Team</p>
        <div style="margin-top: 30px; font-size: 12px; color: #999; text-align: center; border-top: 1px solid #ddd; padding-top: 15px;">
          <p>This is an automated message. Please do not reply to this email.</p>
          <p>&copy; 2025 Jotterly. All rights reserved.</p>
        </div>
      </div>
    </body>`,
      });
      console.log("Email Sent: %s", info.messageId);
      return true; //Success
    }
  } catch (error) {
    error.message = "Internal Server Error!";
    console.error(error);
    return false; //Error
  }
};

export default sendMail;
