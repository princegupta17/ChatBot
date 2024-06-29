import { Router } from "express";
import {
  getAllUsers,
  userSignup,
  userlogin,
} from "../controllers/user-controller.js";
import {
  loginValidator,
  signupValidator,
  validate,
} from "../utils/validators.js";

const userRoutes = Router();

userRoutes.get("/", getAllUsers);
userRoutes.post("/signup", validate(signupValidator), userSignup);
userRoutes.post("/login", validate(loginValidator), userlogin);

export default userRoutes;
