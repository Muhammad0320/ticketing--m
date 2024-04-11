import { Subjects } from "./Subjects";
export interface TicketCreatedEvent {
    subject: Subjects.TicketCreated;
    data: {
        id: string;
        version: number;
        title: string;
        userId: string;
        price: number;
    };
}
