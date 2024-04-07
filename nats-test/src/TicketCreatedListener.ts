import { Message } from "node-nats-streaming";
import { Listener } from "./Listener";

export class TicketCreatedListenr extends Listener {
  subject = "order:created";

  queueGroupName = "payment-service";

  onMessage(data: any, msg: Message): void {
    console.log(`Event data!: ${data}`);

    msg.ack();
  }
}
