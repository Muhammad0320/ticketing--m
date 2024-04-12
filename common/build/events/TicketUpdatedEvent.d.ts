import { Subjects } from "./Subjects";
export interface TicketUpdatedEvent {
    subject: Subjects.TicketUpdated;
    data: {
        id: string;
        userId: string;
        version: number;
        title: string;
        price: number;
        orderId?: string;
    };
}
