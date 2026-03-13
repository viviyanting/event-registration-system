import EventList from "@/components/EventList";

async function getEvents() {

    const res = await fetch(`${ process.env.NEXT_PUBLIC_BASE_URL}/api/events`)
    if(!res.ok){
        throw new Error("failed to fetch events");
    }

    return res.json();
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