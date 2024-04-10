import { app } from "../../app";
import Orders from "../../model/orders";
import Ticket from "../../model/tickets";
import request from "supertest";

const buildTicket = async () => {
  const ticket = await Ticket.buildTicket({ price: 99, title: "sport event" });

  return ticket;
};

it("fetches all the tickets that belogs to a user", async () => {
  const ticketOne = await buildTicket();
  const ticketTwo = await buildTicket();
  const ticketThree = await buildTicket();

  const user1 = global.signin();

  const user2 = global.signin();

  await request(app)
    .post("/api/orders")
    .set("Cookie", user1)
    .send({ ticketId: ticketOne.id })
    .expect(201);

  const {
    body: { data: order2 },
  } = await request(app)
    .post("/api/orders")
    .set("Cookie", user2)
    .send({ ticketId: ticketTwo.id })
    .expect(201);

  const {
    body: { data: order3 },
  } = await request(app)
    .post("/api/orders")
    .set("Cookie", user2)
    .send({ ticketId: ticketThree.id })
    .expect(201);

  const {
    body: { data: orderData },
  } = await request(app)
    .get("/api/orders")
    .set("Cookie", user2)
    .send()
    .expect(200);

  expect(orderData.length).toEqual(2);
  expect(orderData[0].id).toEqual(order2.id);
  expect(orderData[1].id).toEqual(order3.id);
  expect(orderData[0].ticket.id).toEqual(ticketTwo.id);
  expect(orderData[1].ticket.id).toEqual(ticketThree.id);
});
