import { Request, Response } from "express";
import { createMessage, listMessages } from "../services/messageService";

export const postMessage = (req: Request, res: Response) => {
  const { user, message } = req.body;

  if (!user || !message) {
    return res.status(400).json({ error: "User and message are required" });
  }

  const result = createMessage({ user, message });
  return res.status(201).json(result);
};

export const getMessages = (req: Request, res: Response) => {
  const { user, message, page, limit } = req.query;

  const filters = {
    user: user as string,
    message: message as string,
    page: page ? parseInt(page as string) : 1,
    limit: limit ? parseInt(limit as string) : 10,
  };

  const result = listMessages(filters);
  return res.status(200).json(result);
};
