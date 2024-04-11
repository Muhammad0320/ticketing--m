import mongoose from "mongoose";
import Ticket from "../../../model/tickets";
import { natsWrapper } from "../../../natsWrapper";
import { TicketCreatedListener } from "../TicketCreatedListener";
import { Message } from "node-nats-streaming";
import { TicketCreatedEvent } from "@m0ticketing/common";

const setup = async () => {
  const listener = new TicketCreatedListener(natsWrapper.client);

  const data: TicketCreatedEvent["data"] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "Shit",
    price: 44,
    userId: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
  };

  // @ts-ignore

  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg };
};

it("created and saves the ticket", async () => {});
