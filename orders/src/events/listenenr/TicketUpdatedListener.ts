import { Listener, Subjects, TicketUpdatedEvent } from "@m0ticketing/common";
import { queueGroupName } from "./queueGroupName";
import { Message } from "node-nats-streaming";
import Ticket from "../../model/tickets";

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;

  queueGroupName = queueGroupName;

  async onMessage(data: TicketUpdatedEvent["data"], msg: Message) {
    //

    const ticket = await Ticket.findByEvent({
      id: data.id,
      version: data.version,
    });

    if (!ticket) {
      throw new Error("Ticket not found");
    }

    const { title, price, version } = data;

    ticket.set({ title, price, version });
    await ticket.save();
    msg.ack();
  }
}
