import { randomBytes } from "crypto";
import nats, { Message, Stan, SubscriptionOptions } from "node-nats-streaming";

console.clear();

const stan = nats.connect("ticketing--m", randomBytes(4).toString("hex"), {
  connectTimeout: 100 * 1000,
});

stan.on("connect", () => {
  console.log("Event Listener created");

  stan.on("close", () => {
    console.log(" NATS connection closed! ");

    process.exit();
  });

  new TicketCreatedListenr(stan).listen();
});

process.on("SIGTERM", () => stan.close());
process.on("SIGINT", () => stan.close());

abstract class Listener {
  abstract subject: string;

  abstract queueGroupName: string;

  abstract onMessage(data: any, msg: Message): void;

  private client: Stan;

  protected ackWait: number = 5 * 1000;

  constructor(client: Stan) {
    this.client = client;
  }

  subscriptionOptions(): SubscriptionOptions {
    return this.client
      .subscriptionOptions()
      .setAckWait(this.ackWait)
      .setManualAckMode(true)
      .setDeliverAllAvailable()
      .setDurableName(this.queueGroupName);
  }

  listen() {
    const subscription = this.client.subscribe(
      this.subject,
      this.queueGroupName,
      this.subscriptionOptions()
    );

    subscription.on("message", async (msg: Message) => {
      console.log(
        ` Received event ${msg.getSequence()} ${this.subject} / ${
          this.queueGroupName
        } `
      );

      const data = this.parseMessage(msg);

      this.onMessage(data, msg);
    });
  }

  parseMessage(msg: Message) {
    const data = msg.getData() as string;

    return JSON.parse(data);
  }
}

class TicketCreatedListenr extends Listener {
  subject = "ticket:created";

  queueGroupName = "payment-service";

  onMessage(data: any, msg: Message) {
    console.log(`Event data!: ${JSON.stringify(data)}`);

    msg.ack();
  }
}
