"use client"
import styles from "./EventItem.module.css";
import { Event } from "@/types/event";
import { useState } from "react";
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
        {
            event.isFull? (
                <div>已額滿</div>
            ) : ( 
                <div>還剩{event.capacity - event.registrations}個名額</div>                
            )
        }
        
        
        <button onClick={handleDetail} className={styles.button}>
            View Detail
        </button>
            
        </div>

        
    );
}
