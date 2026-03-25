import jwt from "jsonwebtoken";
import { User } from "@/types/user";

const JWT_SECRET = process.env.JWT_SECRET as string;

export function signToken(user:User) {
  return jwt.sign({ 
    userId: user.id,
    email:user.email,
    userName: user.username, 
  }, JWT_SECRET, {
    expiresIn: "7d",
  });
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET) as { userId: number };
}
