import mongoose from "mongoose";
import Ticket from "../../../model/tickets";
import { natsWrapper } from "../../../natsWrapper";
import { ExpirationCompletedListener } from "../ExpirationCompletedListener";
import Orders, { OrderStatus } from "../../../model/orders";
import { ExpirationCompleteEvent } from "@m0ticketing/common";
import { Message } from "node-nats-streaming";

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
    userId: "shittt",
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

it("updates order status to cancelled ", async () => {});
