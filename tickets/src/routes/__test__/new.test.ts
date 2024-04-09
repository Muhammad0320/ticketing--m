import request from "supertest";
import { app } from "../../app";
import Tickets from "../../model/tickets";
import { natsWrapper } from "../../natsWrapper";

it("has a route handler listening to /api/tickets for post request", async () => {
  const response = await request(app).post("/api/tickets").send({});
  expect(response.status).not.toEqual(404);
});

it("can only be accessed if user is authenticated", async () => {
  await request(app).post("/api/tickets").send({}).expect(401);
});

it("return a status other than 401 if the user is autheticated", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({});

  expect(response.status).not.toEqual(401);
});

it("return an error if user inputs an invalid title", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ price: 10 })
    .expect(400);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title: "", price: 10 })
    .expect(400);
});

it("return an error when user inputs an invlid price", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title: "concert", price: -10 })
    .expect(400);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title: "concert" })
    .expect(400);
});

it("creates a ticket with valid inputs", async () => {
  let ticket = await Tickets.find({});

  expect(ticket.length).toEqual(0);

  const price = 50;
  const title = "concert";

  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title, price })
    .expect(201);

  ticket = await Tickets.find({});

  expect(ticket.length).toEqual(1);

  expect(ticket[0].price).toEqual(price);
  expect(ticket[0].title).toEqual(title);
});

it("publishes a tikcet created event", async () => {
  const price = 50;
  const title = "concert";

  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title, price })
    .expect(201);
  
  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
