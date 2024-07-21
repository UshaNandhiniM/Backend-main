import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.PASSMAIL,
    pass: process.env.PASSKEY,
  },
});

const sendPasswordResetEmail = async (userMail, userID) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.PASSMAIL, // sender address
      to: userMail, // list of receivers
      subject: "Password Reset Request", // Subject line
      text: "Success", // plain text body
      html: `Dear ${userMail},
We have received a request to reset the password for your account associated with the ID ${userID}.
If you did not request a password reset, please ignore this email. Your password will remain unchanged.
To reset your password, please click the link below:
https://auth-password.netlify.app/resetpassword/${userID}`, // html body
    });
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.log(error);
    return { success: false, error };
  }
};

export default sendPasswordResetEmail;
