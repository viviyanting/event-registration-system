import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export function signToken(user_id: number,user_name: string) {
  return jwt.sign({ 
    userId: user_id,
    username: user_name 
  }, JWT_SECRET, {
    expiresIn: "7d",
  });
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET) as { userId: number };
}
