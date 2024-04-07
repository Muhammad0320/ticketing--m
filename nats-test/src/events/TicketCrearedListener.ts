import { Message } from "node-nats-streaming";
import { Listener } from "./BaseListener";
import { TicketCreatedEvent } from "./TicketCreatedEvent";
import { Subjects } from "./Subjects";

export class TicketCreatedListenr extends Listener<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;

  queueGroupName = "payment-service";

  onMessage(data: TicketCreatedEvent["data"], msg: Message) {
    console.log(`Event data!`, data);

    msg.ack();
  }
}
