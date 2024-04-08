import { Publisher, Subjects, TicketUpdatedEvent } from "@m0ticketing/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
