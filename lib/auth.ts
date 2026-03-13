import { verifyToken } from "@/lib/jwt";

export function getUserIdFromRequest(req:Request){
    const authHeader = req.headers.get("authorization");
    if(!authHeader){
        return null;
    }
    const token = authHeader.split(" ")[1];

    try
    {
        const decoded = verifyToken(token);
        return decoded.userId;
    }
    catch
    {
        return null;
    }
}

export function requireUser(req:Request): number{
    const userId = getUserIdFromRequest(req);

    if(!userId){
        throw new UnauthorizedError();
    }

    return userId;

}

export function unauthorized() {
    return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
    )
}

export class UnauthorizedError extends Error{}