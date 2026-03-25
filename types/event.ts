export type Events = Event[];

export type Event = {
    id: number;
    title: string;
    content: string;
    capacity:number;
    date:Date;
    isRegistered: boolean;
    registrations:number;
    isFull:boolean;
};