import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { Response, NextFunction, Request } from "express";

export const verifyJwt = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Invalid header",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token || token === undefined) {
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
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    // Handle other errors
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
