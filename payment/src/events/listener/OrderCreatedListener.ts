import { Listener, OrderCreatedEvent, Subjects } from "@m0ticketing/common";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
