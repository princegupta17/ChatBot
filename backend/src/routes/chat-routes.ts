import { Router } from "express";
import { verifyToken } from "../utils/token.js";
import { chatCompeletionValidator, validate } from "../utils/validators.js";
import { generateChat } from "../controllers/chat-controller.js";

const chatRoutes = Router();
chatRoutes.post(
  "/new",
  validate(chatCompeletionValidator),
  verifyToken,
  generateChat
);

export default chatRoutes;
