import {
  ExpirationCompleteEvent,
  Listener,
  OrderStatus,
  Subjects,
} from "@m0ticketing/common";
import Orders from "../../model/orders";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queueGroupName";
import { OrderCancelledPublisher } from "../publisher/OrderCancelledPublisher";

export class ExpirationCompletedListener extends Listener<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationCompleted;

  queueGroupName = queueGroupName;

  async onMessage(data: ExpirationCompleteEvent["data"], msg: Message) {
    const order = await Orders.findById(data.id).populate("ticket");

    if (!order) {
      throw new Error("Order not found");
    }

    order.status = OrderStatus.Cancelled;
    await order.save();

    await new OrderCancelledPublisher(this.client).publish({
      id: order.id,
      ticket: { id: order.ticket.id },
    });
  }
}
