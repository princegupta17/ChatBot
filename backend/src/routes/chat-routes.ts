import { Router } from "express";
import { verifyToken } from "../utils/token.js";
import { chatCompeletionValidator, validate } from "../utils/validators.js";
import {
  deleteChats,
  generateChat,
  sendChats,
} from "../controllers/chat-controller.js";

const chatRoutes = Router();
chatRoutes.post(
  "/new",
  validate(chatCompeletionValidator),
  verifyToken,
  generateChat
);

chatRoutes.get("/all-chats", verifyToken, sendChats);
chatRoutes.delete("/delete", verifyToken, deleteChats);

export default chatRoutes;
