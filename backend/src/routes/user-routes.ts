import { Router } from "express";
import {
  getAllUsers,
  logoutUser,
  userSignup,
  userlogin,
  verifyUser,
} from "../controllers/user-controller.js";
import {
  loginValidator,
  signupValidator,
  validate,
} from "../utils/validators.js";
import { verifyToken } from "../utils/token.js";

const userRoutes = Router();

userRoutes.get("/", getAllUsers);
userRoutes.post("/signup", validate(signupValidator), userSignup);
userRoutes.post("/login", validate(loginValidator), userlogin);
userRoutes.get("/auth-status", verifyToken, verifyUser);
userRoutes.get("/logout", verifyToken, logoutUser);

export default userRoutes;
