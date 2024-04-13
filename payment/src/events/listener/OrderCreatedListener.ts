import {
  Listener,
  OrderCreatedEvent,
  Subjects,
  OrderStatus,
} from "@m0ticketing/common";
import { queueGroupName } from "./queueGroupName";
import { Message } from "node-nats-streaming";
import { Orders } from "../../model/order";

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
