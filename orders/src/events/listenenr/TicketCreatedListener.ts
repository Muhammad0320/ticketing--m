import { Listener, Subjects, TicketCreatedEvent } from "@m0ticketing/common";
import { queueGroupName } from "./queueGroupName";
import { Message } from "node-nats-streaming";
import Ticket from "../../model/tickets";

export class TciketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;

  queueGroupName = queueGroupName;

  async onMessage(data: TicketCreatedEvent["data"], msg: Message) {
    const { id, title, price } = data;

    await Ticket.buildTicket({ id, title, price });

    msg.ack();
  }
}
