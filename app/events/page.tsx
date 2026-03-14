import EventList from "@/components/EventList";
import { fetcher } from "@/lib/fetcher"

async function getEvents() {

    const events = await fetcher(`${ process.env.NEXT_PUBLIC_BASE_URL}/api/events`)
    console.log("events = ",events)
    if(!events.ok){
        throw new Error("failed to fetch events");
    }
    return events.json();
}

export default async function EventsPage(){
    const events = await getEvents();
    return (
        <div className="container">
            <h1>活動列表</h1>
            <EventList events={events}/>
        </div>
    )
}