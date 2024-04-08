import { Publisher, Subjects, TicketCreatedEvent } from "@m0ticketing/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subjects = Subjects.TicketCreated;
}
