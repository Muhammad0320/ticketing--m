import { Subjects } from "./Subjects";

export interface TicketUpdatedEvent {
  subject: Subjects.TicketUpdated;

  data: {
    id: string;
    userId: string;
    title: string;
    price: number;
  };
}
