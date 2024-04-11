import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import Ticket from "../../model/tickets";

it("returns a 404 if the order does not exist", async () => {
  const orderId = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .get(`/api/orders/${orderId}`)
    .set("Cookie", global.signin())
    .send({})
    .expect(404);
});

it("return a 401 if user tried to find other people's  order ", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  const ticket = await Ticket.buildTicket({ title: "shit", price: 90, id });

  const {
    body: { data: orderData },
  } = await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({ ticketId: ticket.id })
    .expect(201);

  await request(app)
    .get(`/api/orders/${orderData.id}`)
    .set("Cookie", global.signin())
    .send()
    .expect(401);
});

it("fetches an order", async () => {
  const user = global.signin();

  const id = new mongoose.Types.ObjectId().toHexString();

  const ticket = await Ticket.buildTicket({ title: "shit", price: 90, id });

  const {
    body: { data: orderData },
  } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(201);

  console.log(orderData.userId, "Testtttttttttttttt");

  await request(app)
    .get(`/api/orders/${orderData.id}`)
    .set("Cookie", user)
    .send()
    .expect(200);
});
