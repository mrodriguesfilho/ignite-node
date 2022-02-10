import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error("Token is missing!");
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub } = verify(
      token,
      "ec31c480f1e8eca57a80509699be0c68"
    ) as IPayload;
    console.log(sub);
    next();
  } catch {
    throw new Error("Invalid Token!");
  }
}
