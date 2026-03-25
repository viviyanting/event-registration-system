//【API-活動清單頁】
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    console.log("GET /api/events");
    //取得活動清單
    const events = await prisma.event.findMany(
      {
        include: 
        { _count: { select: { registrations: true } } }
      }
    );

    var result = [];
    for(const event of events){
      var content = "";
      if(event.content.length > 15){
        content = event.content.substring(0,14) + "...";
      }
      else{
        content = event.content;
      }


      var temp = {
        id: event.id,
        title: event.title,
        content: content,
        capacity:event.capacity,
        date:event.date,
        registrations:event._count.registrations,
        isFull:event._count.registrations >=  event.capacity,
      }
      result.push(temp);
    }


    return NextResponse.json(result);
    
}