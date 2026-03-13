"use client"
import styles from "./EventItem.module.css";

type Event = {
    id: number;
    title: string;
    content: string;
    isRegistered: boolean;
};

type Props = {
    event : Event;
};

export default function EventItem({event}:Props){
    const handleDetail = async () => {
        if(!event.id){
            console.error("event.id is missing! ", event);
            return;
        }
        window.location.href = `/events/${ Number(event.id)}`;    
    }


    return (
        <div className={styles.card}>
        <div className={styles.title}>{event.title}</div>
        <div className={styles.desc}>{event.content}</div>
            <button onClick={handleDetail} className={styles.button}>
                View Detail
            </button>
        </div>

        
    );
}
