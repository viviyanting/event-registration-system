//【API-活動詳細頁】報名
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { UnauthorizedError,requireUser } from "@/lib/auth";

type Props = {
  params: Promise<{ id: string }>;
};

export async function POST(request:Request, props: Props) {
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

    //確認活動存在
    const eventId = Number((await props.params).id);
    const event = await prisma.event.findUnique({
        where: { id: eventId}
    })
    if(!event){
        console.log("找不到活動");
        return NextResponse.json(
            { message:"活動不存在" },
            { status:404 }
        );
    }

    //新增報名資料
    try
    {
        console.log("新增報名資料");
        await prisma.registration.create(
            {
                data: {
                    userId: userId,
                    eventId: eventId
                }
            }
        )
        //整理資料再傳到Client
        const  Event = {
          id: eventId,
          title: event?.title,
          content: event?.content,
          isRegistered: true
        };

        return NextResponse.json(Event);
    }
    catch(error)
    {
        return Response.json(
            { message: "already registered" },
            { status: 400 }
        )
    }    
}



    