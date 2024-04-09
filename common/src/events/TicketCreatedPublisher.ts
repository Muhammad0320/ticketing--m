import { Subjects } from "./Subjects";
import { Publisher } from "./BasePublisher";
import { TicketCreatedEvent } from "./TicketCreatedEvent";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
