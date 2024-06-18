import { Request, Response,NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET: string = process.env.JWT_SECRET as string;

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({msg: "Authorization header missing"})
  }

  const token = authHeader.split(' ')[1]

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).send({msg: "Invalid or expired token"});
    }
    (req as any).user = user;
  });

  next()
}