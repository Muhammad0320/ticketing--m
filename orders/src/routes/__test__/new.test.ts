import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import Ticket from "../../model/tickets";
import Orders, { OrderStatus } from "../../model/orders";

it("returns a 404 if ticket does not exist", async () => {
  const ticketId = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({ ticketId })
    .expect(404);
});

it("returns a 400 if a ticket is already reserved", async () => {
  const userId = new mongoose.Types.ObjectId().toHexString();

  const ticket = await Ticket.buildTicket({ title: "shit ticket", price: 99 });

  const order = await Orders.buildOrder({
    userId,
    status: OrderStatus.Created,
    expiresAt: new Date(),
    ticket,
  });

  console.log(order);

  await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({ ticketId: ticket.id })
    .expect(400);
});

it("creates a order", async () => {
  const ticket = await Ticket.buildTicket({ title: "shit ticket", price: 99 });

  await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({ ticketId: ticket.id })
    .expect(201);
});
