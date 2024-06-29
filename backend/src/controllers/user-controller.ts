import { NextFunction, Request, Response } from "express";
import User from "../models/user-model.js";
import bcrypt from "bcrypt";
import { createToken } from "../utils/token.js";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();
    return res.status(200).json({ message: "Ok", users });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "ERROR", cause: error.message });
  }
};

export const userSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;
    const existinguser = await User.findOne({ email });
    if (existinguser) return res.status(401).send("User already registered");
    const hashpassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashpassword });
    await user.save();

    res.clearCookie("auth_token", {
      path: "/",
      domain: "localhost",
      httpOnly: true,
      signed: true,
    });

    const token = createToken(user._id.toString(), user.email);
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    res.cookie("auth_token", token, {
      path: "/",
      domain: "localhost",
      expires,
      httpOnly: true,
      signed: true,
    });

    return res.status(201).json({ message: "Ok", id: user._id.toString() });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "ERROR", cause: error.message });
  }
};

export const userlogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send("User not registered");
    }

    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) return res.status(401).send("Invalid Password");

    res.clearCookie("auth_token", {
      path: "/",
      domain: "localhost",
      httpOnly: true,
      signed: true,
    });

    const token = createToken(user._id.toString(), user.email);
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    res.cookie("auth_token", token, {
      path: "/",
      domain: "localhost",
      expires,
      httpOnly: true,
      signed: true,
    });

    return res.status(201).json({ message: "Ok", id: user._id.toString() });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "ERROR", cause: error.message });
  }
};
