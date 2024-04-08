import { Publisher } from "./BasePublisher";
import { Subjects } from "./Subjects";
import { TicketCreatedEvent } from "./TicketCreatedEvent";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subjects = Subjects.TicketCreated;
}
