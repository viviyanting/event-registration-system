"use client"
import EventItem from "./EventItem";

type Event = {
    id: number;
    title: string;
    content: string;
    isRegistered: boolean;
};

type Props = {
    events: Event[];
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