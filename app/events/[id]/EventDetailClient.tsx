//【PAGE(Client)-活動詳細頁】
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetcher } from "@/lib/fetcher"
import { Event } from "@/types/event";

export default function EventDetailClient({ eventId }: { eventId: string }) {

  const [event, setEvent] = useState<Event | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // 取得活動資料
  useEffect(() => {

    const fetchEvent = async () => {
      try
      {
        const token = localStorage.getItem("token");
        const res = await fetcher(`/api/events/${eventId}`,{token})
        if(res.status === 404){
          setError("活動不存在");
          return;
        }
        const data = await res.json();
        setEvent(data);

      }
      catch
      {
        setError("載入失敗");
      }      
    };
    fetchEvent();
    // if(event?.isFull){
    //   setLoading(false);
    // }
  }, [eventId]);

  //按報名/取消後
  const handleApiResponse = async (
    res: Response, successMessage: string) => {
    try 
    {
      if (res.status === 401) {
        alert("請先登入");
        router.push("/login");
        return;
      }
      if (res.status === 404) {
        setError("活動不存在");
        return;
      }
      if (!res.ok) {
        throw new Error();
      }
      const data = await res.json();
      setEvent(data);
      alert(successMessage);
    } 
    catch 
    {
      alert("操作失敗");
    } finally {
      setLoading(false);
    }
  };


  //報名
  const handleRegister = async () => {
    if (!eventId) return;

    setLoading(true);

    const token = localStorage.getItem("token");
    const res = await fetcher(`/api/events/${eventId}/register`,{method:"POST", token})
    await handleApiResponse(res, "報名成功！");
  };

  //取消報名
  const handleCancel = async () => {

    if (!eventId) return;

    setLoading(true);

    const token = localStorage.getItem("token");
    const res = await fetcher(`/api/events/${eventId}/cancel`,{method:"DELETE", token})
    await handleApiResponse(res, "已取消報名！");
  };

  if(error){
    return <div>{error}</div>;
  }

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>{event.title}</h1>
      <p>{event.content}</p>

      {event.isRegistered ? (
        <button onClick={handleCancel} disabled={loading}>
          取消報名
        </button>
      ) : (
        <button onClick={handleRegister} disabled={loading}>
          我要報名
        </button>
      )}

      <div>
        已報名人數：{event.registrations} 人
        <br></br>
        名額上限：{event.capacity} 人
      </div>  


    </div>
  );
}
