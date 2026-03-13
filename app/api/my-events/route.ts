//【API-我的活動清單頁】
import { NextResponse } from "next/server";
import { requireUser,UnauthorizedError } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
    //解析token取得user資料
    var userId = 0;
    try
    {
        //取得user資料
        userId = requireUser(request);
    }
    catch(error)
    {
        if(error instanceof UnauthorizedError){
            return Response.json(
                { error: "UNAUTHORIZED" },
                { status: 401 }
            );
        }
        return Response.json(
            { error: "Server error" },
            { status: 500 }
        );
    }

    //取得我的活動清單
    const events = await prisma.registration.findMany({
      where: {
        userId
      },
      include: {
        event: true
      }
    })

    //重組資料
    let myEvents = [];
    for(var i = 0 ; i < events.length ; i++ ){
      const temp = events[i].event;
      myEvents.push(temp);
    }
    return NextResponse.json(myEvents);    
}