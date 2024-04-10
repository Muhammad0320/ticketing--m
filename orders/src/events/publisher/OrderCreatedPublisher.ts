import { OrderCreatedEvent, Publisher, Subjects } from "@m0ticketing/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
