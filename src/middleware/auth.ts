import { Request, Response, NextFunction } from "express";

const API_KEY = "viceversa-secret-key";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey || apiKey !== API_KEY) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
};
