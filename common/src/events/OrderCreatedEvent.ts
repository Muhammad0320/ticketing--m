import { Subjects } from "./Subjects";
import { OrderStatus } from "./types/OrderStatus";

export interface OrderCreatedEvent {
  subject: Subjects.OrderCreated;

  data: {
    id: string;
    status: OrderStatus.Created;
    userId: string;
    expiresAt: string;

    ticket: {
      id: string;
      price: number;
    };
  };
}
