import express from "express";
import {
  forgetPassword,
  getUser,
  google,
  loginUser,
  registerUser,
  resetPassword,
} from "../Contollers/userController.js";

const router = express.Router();

router.post("/register-user", registerUser);
router.get("/get-user/:id",getUser);
router.post("/login-user", loginUser);
router.post("/forget-password", forgetPassword);
router.post("/reset-password/:id", resetPassword);
router.post("/google",google);

export default router;
