//【API-活動清單頁】
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    console.log("GET /api/events");
    //取得活動清單
    const events = await prisma.event.findMany();
    return NextResponse.json(events);
    
}