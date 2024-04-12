import { Subjects } from "./Subjects";
import { Message, Stan, SubscriptionOptions } from "node-nats-streaming";

interface Event {
  subject: Subjects;
  data: any;
}

export abstract class Listener<T extends Event> {
  abstract subject: T["subject"];

  abstract queueGroupName: string;

  abstract onMessage(data: T["data"], msg: Message): void;

  protected client: Stan;

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
