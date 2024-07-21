import User from "../Models/userSchema.js";
import bcrpty from "bcryptjs";
import sendPasswordResetEmail from "../Services/Email.js";
import { errorHandler } from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const registerUser = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return next(errorHandler(400, "All the Fields Are Required"));
  }
  const hashedPassword = bcrpty.hashSync(password, 10);

  const newUser = new User({ username, email, password: hashedPassword });
  const { password: pass, ...rest } = newUser._doc;
  try {
    await newUser.save();
    res
      .status(200)
      .json({ message: "User Registered Successfully", result: newUser });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password || email === "" || password === "") {
      return next(errorHandler(400, "All the Fields Are Required"));
    }
    const userDetails = await User.findOne({ email });

    const passwordMatch = await bcrpty.compare(password, userDetails.password);
    if (!userDetails || !passwordMatch) {
      return next(errorHandler(400, "Invalid Credentials"));
    }
    const token = jwt.sign({ id: userDetails._id }, process.env.PASSKEY, {
      expiresIn: "1h",
    });
    const { password: pass, ...rest } = userDetails._doc;
    res
      .status(200)
      .send({
        message: "user Logged in successfully",
        rest,
       token,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "register failed" });
  }
};


export const google= async(req,res,next)=>{
  const{email,name,profilePic}=req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.PASSKEY, {
        expiresIn: "1h",
      });
      const { password: pass, ...rest } = user._doc;
      res
        .status(200)
        .send({
          message: "user Logged in successfully", rest
        });
    }
    else{
      const generatePassword=Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8)
      const hashedPassword = bcrpty.hashSync(generatePassword, 10);
      const newUser =new User({
        username: name.split(' ').join('').toLowerCase() +
        Math.random().toString(36).slice(-4),
      email: email,
      password: hashedPassword,
      profilePicture:profilePic,
    });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.PASSKEY);
      const { password: pass, ...rest } = newUser._doc;
      res
       .status(200) 
       .send({
          message: "user created and logged in successfully",
          rest,token
        });
      }
  } catch (error) {
    next(error)
    
  } }

export const forgetPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ Message: "User Not Found" });
  }
  const { success, error } = await sendPasswordResetEmail(user.email, user._id);

  if (success) {
    res.status(200).json({ Message: "Password reset email sent" });
  } else {
    res.status(500).json({ Message: "Error sending email", error });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const userid = req.params.id;
    const { newpassword, confirmpassword } = req.body;
    if (newpassword !== confirmpassword) {
      return res.status(401).json({ Message: "Pasword Doesn't Match" });
    }
    const hash = await bcrpty.hash(confirmpassword, 10);
    await User.findByIdAndUpdate({ _id: userid }, { password: hash });
    res.status(200).json({ Message: "Pasword Reset Successfully" });
  } catch (error) {
    res.status(500).json({ Message: "Internal Server Error" });
  }
};

export const getUser = async(req,res)=>{
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}
