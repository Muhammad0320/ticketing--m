import request from "supertest";
import { app } from "../../app";

it("has a route handler listening to /api/tickets for post request", async () => {
  const response = await request(app).post("/api/tickets").send({});

  expect(response.status).not.toEqual(404);
});

it("can only be accessed if user is authenticated", async () => {
  await request(app).post("/api/tickets").send({}).expect(404);
});

it("return an status other than 401 if the user is autheticated", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({});

  expect(response.status).not.toEqual(401);
});

it("return an error if user inputs an invalid title", async () => {});

it("return an error when user inputs an invlid price", async () => {});

it("creates a ticket with valid inputs", async () => {});
