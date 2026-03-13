//【API-活動詳細頁】取得活動詳細資料
import prisma from "@/lib/prisma";
import { getUserIdFromRequest } from "@/lib/auth";

type Props = {
  params: Promise<{ id: string }>;
};

export async function GET(
  request: Request, props: Props) 
  {
    //解析token取得user資料
    const userId = getUserIdFromRequest(request);
    const eventId = Number((await props.params).id);
    //取得活動詳細資料
    const event = await prisma.event.findUnique({
      where: {  id: eventId  },
      include: {  registrations: true  }
    });

    if(!event){
      return Response.json(
        { message: "not found" },
        { status: 404 }
      );
    }

    //判斷是否報名(沒有登入就是沒報名)
    const isRegistered = userId
      ? event.registrations.some(r => r.userId === Number(userId))
      : false;


  //整理資料再傳到Client
  const  result = {
    id: eventId,
    title: event?.title,
    content: event?.content,
    isRegistered: isRegistered
  };

  return Response.json(result);
  
}
