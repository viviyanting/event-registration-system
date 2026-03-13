"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import EventList from "@/components/EventList";

type Event = {
    id: number;
    title: string;
    content: string;
    isRegistered: boolean;
};

type Events = Event[];

export default function MyEventsClient(){

    const [myEvents, setMyEvents] = useState<Events | null>(null);
  const router = useRouter();

    useEffect(() => {
        const fetchMyEvent = async () => {
        const token = localStorage.getItem("token");
        const res = await fetch(`/api/my-events`, {
          headers: token
            ? { Authorization: `Bearer ${token}` }
          : undefined
        });

        if (res.status === 401) {
            alert("請先登入");
            router.push("/login");
            return;
        }

        const data = await res.json();
        setMyEvents(data);
    };

    fetchMyEvent();
    }, [])
    
    if (!myEvents) {
      return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <h1>我的活動</h1>

            {myEvents.length>0 ? (
                <EventList events={ myEvents }/>
            ) : (
                <div>您還沒有活動喔~快去看看吧</div>
            )            
            }            
        </div>
    )
}