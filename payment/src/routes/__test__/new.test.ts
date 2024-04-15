import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { Orders } from "../../model/order";
import { OrderStatus } from "@m0ticketing/common";

jest.setTimeout(15 * 1000);

it("returns a 404 if there is no order with such id", async () => {
  await request(app)
    .post("/api/payment")
    .set("Cookie", global.signin())
    .send({
      token: "fejvfjvf",
      orderId: new mongoose.Types.ObjectId().toHexString(),
    })
    .expect(404);
});

it("returns a 401 if users tried to pay for a ticket that they don't own", async () => {
  const order = await Orders.buildOrder({
    id: new mongoose.Types.ObjectId().toHexString(),
    price: 99,
    version: 0,
    status: OrderStatus.Created,
    userId: new mongoose.Types.ObjectId().toHexString(),
  });

  await request(app)
    .post("/api/payment")
    .set("Cookie", global.signin())
    .send({
      token: "fejvfjvf",
      orderId: order.id,
    })
    .expect(401);
});

it("returns a 400, if a cancelled order is about to be paid for", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  const order = await Orders.buildOrder({
    id: new mongoose.Types.ObjectId().toHexString(),
    price: 99,
    version: 0,
    status: OrderStatus.Cancelled,
    userId: id,
  });

  await request(app)
    .post("/api/payment")
    .set("Cookie", global.signin(id))
    .send({
      token: "fejvfjvf",
      orderId: order.id,
    })
    .expect(400);
});
