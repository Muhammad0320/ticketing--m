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
};

it("add orderId to ordered ticket", async () => {});
