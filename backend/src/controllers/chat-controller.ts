import { NextFunction, Request, Response } from "express";
import User from "../models/user-model.js";
import OpenAI from "openai";

export const generateChat = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message } = req.body;
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res
        .status(401)
        .json({ message: "user is not registered or token malfunction" });
    }

    //grab all chats of user
    const chats = user.chats.map(({ role, content }) => ({
      role,
      content,
    }));
    chats.push({ role: "user", content: message });
    user.chats.push({ role: "user", content: message });

    //send all chats with new chat to open ai
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const chatResponse = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });

    //grab new response

    user.chats.push({
      role: "assistant",
      content: chatResponse.choices[0].message.content,
    });
    await user.save();

    return res.status(200).json({ chats: user.chats });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const sendChats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered or token malfunction");
    }

    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permission didn't match");
    }

    return res.status(201).json({ message: "Ok", chats: user.chats });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "ERROR", cause: error.message });
  }
};

export const deleteChats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered or token malfunction");
    }

    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permission didn't match");
    }
    //@ts-ignore
    user.chats = [];
    await user.save();
    return res.status(201).json({ message: "Ok" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "ERROR", cause: error.message });
  }
};
