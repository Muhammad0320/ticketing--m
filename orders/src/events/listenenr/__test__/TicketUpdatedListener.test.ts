import mongoose from "mongoose";
import Ticket from "../../../model/tickets";
import { natsWrapper } from "../../../natsWrapper";
import { TicketUpdatedListener } from "../TicketUpdatedListener";
import { TicketUpdatedEvent } from "@m0ticketing/common";
import { Message } from "node-nats-streaming";

const setup = async () => {
  const listener = new TicketUpdatedListener(natsWrapper.client);

  const ticket = await Ticket.buildTicket({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "shit ticket",
    price: 88,
  });

  const data: TicketUpdatedEvent["data"] = {
    id: ticket.id,
    userId: new mongoose.Types.ObjectId().toHexString(),
    version: ticket.version + 1,
    title: "new shit ticket",
    price: 90,
  };

  // @ts-ignore

  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, ticket, data, msg };
};

it("updates and saves a ticket", async () => {});
