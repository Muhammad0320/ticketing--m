import mongoose from "mongoose";
import Ticket from "../../../model/tickets";
import { Message } from "node-nats-streaming";
import { natsWrapper } from "../../../natsWrapper";
import Orders, { OrderStatus } from "../../../model/orders";
import { ExpirationCompleteEvent } from "@m0ticketing/common";
import { ExpirationCompletedListener } from "../ExpirationCompletedListener";

const setup = async () => {
  // create listenner

  const listener = new ExpirationCompletedListener(natsWrapper.client);

  // creared ticket

  const ticket = await Ticket.buildTicket({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "shit concert",
    price: 99,
  });

  // create order

  const order = await Orders.buildOrder({
    userId: new mongoose.Types.ObjectId().toHexString(),
    status: OrderStatus.Created,

    ticket: ticket.id,
    expiresAt: new Date(),
  });

  // create data

  const data: ExpirationCompleteEvent["data"] = {
    id: order.id,
  };

  // create message
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, order, data, msg };
};

it("updates order status to cancelled ", async () => {
  const { listener, order, data, msg } = await setup();

  listener.onMessage(data, msg);

  const updatedOrder = await Orders.findById(order.id);

  console.log(
    updatedOrder,
    "from expiration testtttttttttttttttttttttttttttttttttt"
  );

  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});

it("publishes an event", async () => {
  const { listener, order, data, msg } = await setup();

  listener.onMessage(data, msg);

  const updatedOrder = JSON.parse(
    (natsWrapper.client.publish as jest.Mock).mock.calls[0][1]
  );

  console.log(updatedOrder, "upudaaatedddd");

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});

it("acks the message", async () => {
  const { listener, data, msg } = await setup();

  listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});
