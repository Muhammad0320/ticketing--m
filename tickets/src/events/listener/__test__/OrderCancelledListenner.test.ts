import mongoose from "mongoose";
import Tickets from "../../../model/tickets";
import { natsWrapper } from "../../../natsWrapper";
import { OrderCancelledListener } from "../OrderCancelledListener";
import { OrderCancelledEvent } from "@m0ticketing/common";
import { Message } from "node-nats-streaming";

const setup = async () => {
  const listener = new OrderCancelledListener(natsWrapper.client);

  const ticket = await Tickets.buildTicket({
    userId: "vfevfbvbvbvfeb",
    title: "shit",
    price: 99,
  });

  const orderId = new mongoose.Types.ObjectId().toHexString();

  ticket.set({ orderId });

  await ticket.save();

  const data: OrderCancelledEvent["data"] = {
    id: orderId,
    ticket: {
      id: ticket.id,
    },
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, ticket, data, msg };
};

it("uodates the ticket when order is cancelled", async () => {});
