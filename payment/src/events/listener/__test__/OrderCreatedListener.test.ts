import mongoose from "mongoose";
import { Orders } from "../../../model/order";
import { Message } from "node-nats-streaming";
import { natsWrapper } from "../../../natsWrapper";
import { OrderCreatedListener } from "../OrderCreatedListener";
import { OrderCreatedEvent, OrderStatus } from "@m0ticketing/common";

const setup = async () => {
  const listener = new OrderCreatedListener(natsWrapper.client);

  const id = new mongoose.Types.ObjectId().toHexString();

  const data: OrderCreatedEvent["data"] = {
    id,
    status: OrderStatus.Created,
    userId: "nenefefbenjf",
    expiresAt: "shit date",
    ticket: {
      id: new mongoose.Types.ObjectId().toHexString(),
      price: 99,
    },
  };

  // @ts-ignore

  const msg: Message = {
    ack: jest.fn(),
  };

  return { msg, data, listener };
};

it(" create and saves a tikcket ", async () => {
  const { msg, data, listener } = await setup();

  await listener.onMessage(data, msg);

  const newlyCreatedOrder = await Orders.findById(data.id);

  console.log(data.id);

  console.log(newlyCreatedOrder);

  expect(newlyCreatedOrder!.id).toEqual(data.id);
});

it("acks the message", async () => {
  const { msg, data, listener } = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});
