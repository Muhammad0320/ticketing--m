import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { natsWrapper } from "../../natsWrapper";
import Tickets from "../../model/tickets";
it("returns a 401 if the user is not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put("/api/tickets/" + id)
    .send({ title: "tafseer", price: 50 })
    .expect(401);
});

it("returns a 404 if there is no ticket with such id", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put("/api/tickets/" + id)
    .set("Cookie", global.signin())
    .send({ title: "tafseer", price: 50 })
    .expect(404);
});

it("returns a 400 if user if user provides invalid price or title", async () => {
  const cookie = global.signin();

  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({ title: "Quran competition", price: 99 })
    .expect(201);

  await request(app)
    .put("/api/tickets/" + response.body.data.id)
    .set("Cookie", cookie)
    .send({ title: "", price: 90 })
    .expect(400);
  await request(app)
    .put("/api/tickets/" + response.body.data.id)
    .set("Cookie", cookie)
    .send({ title: "Tafseer", price: -90 })
    .expect(400);
});

it("returns a 401 if user tries to update other peoples ticket", async () => {
  const cookie = global.signin();

  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({ title: "Quran competition", price: 99 })
    .expect(201);

  await request(app)
    .put("/api/tickets/" + response.body.data.id)
    .set("Cookie", global.signin())
    .send({ title: "Shitt", price: 90 })
    .expect(401);

  const ticketResponse = await request(app)
    .get("/api/tickets/" + response.body.data.id)
    .send();

  expect(ticketResponse.body.data.title).toEqual("Quran competition");
  expect(ticketResponse.body.data.price).toEqual(99);
});

it("updates ticket with valid inputs", async () => {
  const cookie = global.signin();

  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({ title: "Quran competition", price: 99 })
    .expect(201);

  const tickeResponse = await request(app)
    .put("/api/tickets/" + response.body.data.id)
    .set("Cookie", cookie)
    .send({ title: "Shitt", price: 90 })
    .expect(200);

  expect(tickeResponse.body.data.title).toEqual("Shitt");
  expect(tickeResponse.body.data.price).toEqual(90);
});

it("publishes ticket updated event", async () => {
  const cookie = global.signin();

  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({ title: "Quran competition", price: 99 })
    .expect(201);

  await request(app)
    .put("/api/tickets/" + response.body.data.id)
    .set("Cookie", cookie)
    .send({ title: "Shitt", price: 90 })
    .expect(200);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});

it("rejects updates for reserved tickets", async () => {
  const cookie = global.signin();

  const {
    body: { data },
  } = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({ title: "Quran competition", price: 99 })
    .expect(201);

  const updatedTicket = await Tickets.findById(data.id);

  updatedTicket?.set({ orderId: new mongoose.Types.ObjectId().toHexString() });

  await request(app)
    .put("/api/tickets/" + data.id)
    .set("Cookie", cookie)
    .send({ title: "Shitt", price: 90 })
    .expect(400);

  expect(updatedTicket!.title).toEqual("Quran competition");
});
