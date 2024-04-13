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
    const order = await Orders.findByIdAndUpdate(data.id, {
      status: OrderStatus.Cancelled,
    }).populate("ticket");

    console.log(order, "This is order from listenenr file it self");

    if (!order) {
      console.log("show your faceeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
      throw new Error("Order not found");
    }

    // order.set({ status: OrderStatus.Cancelled });
    // await order.save();

    await new OrderCancelledPublisher(this.client).publish({
      id: order.id,
      version: order.version,
      ticket: { id: order.ticket.id },
    });

    console.log("event publishedsssssssss");

    msg.ack();
  }
}
