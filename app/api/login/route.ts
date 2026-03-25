//【API-登入頁】
import { NextResponse } from "next/server";
import { signToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";

export async function POST(req:Request) {
    const { email , password } = await req.json()

    //帳號驗證
    const user = await prisma.user.findUnique({
        where: { email }
    })

    if(!user || user.password !==password){
        return NextResponse.json(
        { message: "Login failed" },
        { status: 401 })
    }

    //簽入token
    const token = signToken(user);
    return NextResponse.json({ token })
}
