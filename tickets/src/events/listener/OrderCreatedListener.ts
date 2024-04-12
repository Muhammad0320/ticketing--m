import { Listener, OrderCreatedEvent, Subjects } from "@m0ticketing/common";
import { queueGroupName } from "./queueGroupName";
import { Message } from "node-nats-streaming";
import Tickets from "../../model/tickets";
import { TicketUpdatedPublisher } from "../publisher/TicketUpdatedPublisher";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;

  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    const ticket = await Tickets.findById(data.ticket.id);

    if (!ticket) {
      throw new Error("Ticket not found");
    }

    ticket.set({ orderId: data.id });

    await ticket.save();

    await new TicketUpdatedPublisher(this.client).publish({
      id: ticket.id,
      userId: ticket.userId,

      version: ticket.version,
      title: ticket.title,
      price: ticket.price,
      orderId: ticket.orderId,
    });

    msg.ack();
  }
}
