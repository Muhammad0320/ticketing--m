import { OrderCreatedEvent, OrderStatus } from "@m0ticketing/common";
import Tickets from "../../../model/tickets";
import { natsWrapper } from "../../../natsWrapper";
import { OrderCreatedListener } from "../OrderCreatedListener";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";

const setup = async () => {
  const listener = new OrderCreatedListener(natsWrapper.client);

  const ticket = await Tickets.buildTicket({
    userId: "jbebgibgigr",
    title: "shit title",
    price: 34,
  });

  const data: OrderCreatedEvent["data"] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    status: OrderStatus.Created,
    userId: "shit user",
    expiresAt: "shit day",
    ticket: {
      id: ticket.id,
      price: ticket.price,
    },
  };

  // @ts-ignore

  const msg: Message = {
    ack: jest.fn(),
  };

  return { msg, data, ticket, listener };
};

it("add orderId to the ordered ticket", async () => {
  const { msg, data, ticket, listener } = await setup();

  await listener.onMessage(data, msg);

  const updatedTicket = await Tickets.findById(ticket.id);

  expect(updatedTicket?.orderId).toEqual(data.id);
});

it("acks the message", async () => {
  const { msg, data, ticket, listener } = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});

it("publishes a ticket created event", async () => {
  const { msg, data, listener, ticket } = await setup();

  await listener.onMessage(data, msg);

  expect(natsWrapper.client.publish).toHaveBeenCalled();

  const updatedTicketData = JSON.parse(
    (natsWrapper.client.publish as jest.Mock).mock.calls[0][1]
  );

  expect(updatedTicketData).toBeDefined();
});
