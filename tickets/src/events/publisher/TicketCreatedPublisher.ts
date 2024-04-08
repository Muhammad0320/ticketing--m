import { Publisher, Subjects, TicketCreatedEvent } from "@m0ticketing/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
