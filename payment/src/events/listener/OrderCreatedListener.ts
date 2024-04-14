import {
  Listener,
  OrderCreatedEvent,
  Subjects,
  OrderStatus,
} from "@m0ticketing/common";
import { Orders } from "../../model/order";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queueGroupName";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;

  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    const {
      id,

      userId,

      ticket: { price },
    } = data;

    await Orders.buildOrder({
      id,
      status: OrderStatus.Created,
      price,
      userId,
      version: 0,
    });

    msg.ack();
  }
}
