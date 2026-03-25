"use client"
import EventItem from "./EventItem";
import { Event } from "@/types/event";

type Props = { 
    events:Event[]
};

export default function EventList({events}:Props){
    return (
        <ul>
            {events.map((event)=>(
                <EventItem key={event.id} event={event} />
            ))}
        </ul>
    );
}