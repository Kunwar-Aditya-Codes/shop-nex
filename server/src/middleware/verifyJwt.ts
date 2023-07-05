import jwt from "jsonwebtoken";
import { Response, NextFunction, Request } from "express";

export const verifyJwt = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "Invalid header",
    });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No token!",
    });
  }

  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);

  const { id, role } = decoded as { id: string; role: string };

  req.id = id;
  req.role = role;

  next();
};
