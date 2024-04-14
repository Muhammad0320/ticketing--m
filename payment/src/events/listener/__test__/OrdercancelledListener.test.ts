import mongoose from "mongoose";
import { Orders } from "../../../model/order";
import { natsWrapper } from "../../../natsWrapper";
import { OrderCancelledListener } from "../OrderCancelledListener";
import { OrderCancelledEvent, OrderStatus } from "@m0ticketing/common";
import { Message } from "node-nats-streaming";

const setup = async () => {
  const listener = new OrderCancelledListener(natsWrapper.client);

  const order = await Orders.buildOrder({
    id: new mongoose.Types.ObjectId().toHexString(),
    price: 99,
    version: 0,
    status: OrderStatus.Created,
    userId: "shit user",
  });

  const data: OrderCancelledEvent["data"] = {
    id: order.id,
    version: order.version + 1,
    ticket: {
      id: new mongoose.Types.ObjectId().toHexString(),
    },
  };

  // @ts-ignore

  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, order, data, msg };
};

it("cancels the order", async () => {
  const { listener, order, data, msg } = await setup();

  await listener.onMessage(data, msg);

  const updatedOrder = await Orders.findById(order.id);

  expect(updatedOrder?.status).toEqual(OrderStatus.Cancelled);
});

it("ack the message", async () => {
  const { listener, order, data, msg } = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});
