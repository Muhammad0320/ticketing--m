import {
  Listener,
  OrderCancelledEvent,
  OrderStatus,
  Subjects,
} from "@m0ticketing/common";
import { queueGroupName } from "./queueGroupName";
import { Message } from "node-nats-streaming";
import { Orders } from "../../model/order";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;

  queueGroupName = queueGroupName;

  async onMessage(data: OrderCancelledEvent["data"], msg: Message) {
    const version = data.version - 1;

    const order = await Orders.findOneAndUpdate(
      { _id: data.id, version },
      { status: OrderStatus.Cancelled },
      { new: true }
    );

    if (!order) {
      throw new Error("Orther not found");
    }

    msg.ack();
  }
}
